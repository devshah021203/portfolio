"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  EXPRESSIONS,
  EXPRESSION_COPY,
  FACE_SIZE,
  approachParams,
  cloneParams,
  drawFace,
  type ExpressionName,
  type FaceParams,
} from "./deskbotFace";

type Props = {
  expression: ExpressionName;
  /** Fires when the visitor clicks the bot itself, so the page can follow along. */
  onPoke?: (next: ExpressionName) => void;
  /** Fires whenever the bot has something to say. */
  onSay?: (line: string) => void;
  className?: string;
};

/** Expressions Dwello cycles through when someone keeps poking it. */
const POKE_CYCLE: ExpressionName[] = ["surprised", "excited", "wink", "curious", "happy"];

const POKE_LINES = [
  "Hey — that tickles.",
  "Touch sensor works, then.",
  "Careful, I'm mostly prototype.",
  "Poke me again, I dare you.",
  "Registered. No camera involved.",
];

const WHITE_SHELL = 0xf4f3f0;

export function DeskBotScene({ expression, onPoke, onSay, className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Everything the animation loop needs to read without re-creating the scene.
  const stateRef = useRef({
    target: EXPRESSIONS.happy,
    /** Set by the loop, read on click, so a poke can advance the cycle. */
    pokeIndex: 0,
    waveUntil: 0,
    speakUntil: 0,
    /** Nudged on click so the bot does a little hop. */
    hopUntil: 0,
  });

  const onPokeRef = useRef(onPoke);
  const onSayRef = useRef(onSay);
  useEffect(() => { onPokeRef.current = onPoke; onSayRef.current = onSay; });

  // Keep the target params in sync with the controlled prop.
  useEffect(() => {
    stateRef.current.target = EXPRESSIONS[expression] ?? EXPRESSIONS.happy;
  }, [expression]);

  const handlePoke = useCallback(() => {
    const s = stateRef.current;
    const next = POKE_CYCLE[s.pokeIndex % POKE_CYCLE.length];
    const line = POKE_LINES[s.pokeIndex % POKE_LINES.length];
    s.pokeIndex += 1;
    s.waveUntil = performance.now() + 1500;
    s.speakUntil = performance.now() + 1600;
    s.hopUntil = performance.now() + 520;
    onPokeRef.current?.(next);
    onSayRef.current?.(line);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------------------------------------------------------------- renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 2.35, 9.1);
    camera.lookAt(0, 1.8, 0);

    // ------------------------------------------------------- procedural env map
    // A tiny gradient "studio" run through PMREM. This is what gives the white
    // shell its soft specular roll-off; without it the plastic reads as flat.
    const envCanvas = document.createElement("canvas");
    envCanvas.width = 256;
    envCanvas.height = 128;
    const envCtx = envCanvas.getContext("2d")!;
    const envGrad = envCtx.createLinearGradient(0, 0, 0, 128);
    envGrad.addColorStop(0, "#9fb6d4");
    envGrad.addColorStop(0.45, "#5b6883");
    envGrad.addColorStop(0.62, "#2a3140");
    envGrad.addColorStop(1, "#12161d");
    envCtx.fillStyle = envGrad;
    envCtx.fillRect(0, 0, 256, 128);
    // Two soft boxes: a broad key on the left, a cool kicker on the right.
    const softbox = (x: number, y: number, r: number, color: string) => {
      const g = envCtx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      envCtx.fillStyle = g;
      envCtx.fillRect(x - r, y - r, r * 2, r * 2);
    };
    softbox(60, 34, 52, "rgba(255,255,255,0.95)");
    softbox(205, 46, 40, "rgba(120,220,255,0.55)");
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    envTexture.colorSpace = THREE.SRGBColorSpace;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromEquirectangular(envTexture);
    scene.environment = envRT.texture;
    envTexture.dispose();
    pmrem.dispose();

    // ---------------------------------------------------------------- lighting
    // Kept close to neutral: the shell is meant to read as warm white plastic,
    // and a blue-tinted fill turns the whole bot grey-blue.
    scene.add(new THREE.HemisphereLight(0xf2f6ff, 0x181c24, 0.62));

    const keyLight = new THREE.DirectionalLight(0xfff6ec, 2.4);
    keyLight.position.set(-3.4, 5.2, 4.6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.55);
    fillLight.position.set(4.2, 1.6, 3.2);
    scene.add(fillLight);

    // Cyan kicker along the back edge — this is the only coloured light, and it
    // only ever catches the silhouette.
    const rimLight = new THREE.DirectionalLight(0x5fdcff, 2.2);
    rimLight.position.set(2.4, 3.4, -5.6);
    scene.add(rimLight);

    // Spill from the face screen onto the chest — small detail, big payoff.
    const facePoint = new THREE.PointLight(0x3ee9ff, 1.5, 4.2, 2);
    facePoint.position.set(0, 2.8, 1.5);
    scene.add(facePoint);

    // ---------------------------------------------------------------- materials
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: WHITE_SHELL,
      roughness: 0.5,
      metalness: 0.02,
      envMapIntensity: 0.42,
    });
    const shellSoft = new THREE.MeshStandardMaterial({
      color: 0xe6e4e0,
      roughness: 0.58,
      metalness: 0.02,
      envMapIntensity: 0.38,
    });
    const bezelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1f25,
      roughness: 0.3,
      metalness: 0.55,
      envMapIntensity: 1.1,
    });
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x05070a,
      roughness: 0.12,
      metalness: 0.2,
      envMapIntensity: 1.4,
    });
    const ledMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a2a30,
      emissive: 0x3ee9ff,
      emissiveIntensity: 2.6,
      roughness: 0.35,
    });

    const disposables: { dispose(): void }[] = [
      shellMaterial, shellSoft, bezelMaterial, glassMaterial, ledMaterial,
    ];

    // ------------------------------------------------------------------- rig
    const root = new THREE.Group();
    scene.add(root);

    const bob = new THREE.Group(); // idle breathing + hop
    root.add(bob);

    // --- body: a lathe profile gives the tapered, rounded silhouette ----------
    const BODY_TOP = 1.92;
    const profile: THREE.Vector2[] = [];
    const bodyPoints: [number, number][] = [
      [0.001, 0.00], [0.32, 0.005], [0.58, 0.035], [0.76, 0.115],
      [0.868, 0.27], [0.925, 0.48], [0.948, 0.76], [0.945, 1.04],
      [0.922, 1.28], [0.882, 1.50], [0.832, 1.68], [0.775, 1.80],
      [0.700, 1.87], [0.580, 1.905], [0.34, 1.918], [0.001, BODY_TOP],
    ];
    bodyPoints.forEach(([x, y]) => profile.push(new THREE.Vector2(x, y)));
    const bodyGeometry = new THREE.LatheGeometry(profile, 96);
    bodyGeometry.computeVertexNormals();
    const body = new THREE.Mesh(bodyGeometry, shellMaterial);
    bob.add(body);
    disposables.push(bodyGeometry);

    // Parting line near the base, matching the seam in the renders.
    const seamGeometry = new THREE.TorusGeometry(0.897, 0.007, 8, 96);
    const seam = new THREE.Mesh(seamGeometry, shellSoft);
    seam.rotation.x = Math.PI / 2;
    seam.position.y = 0.33;
    bob.add(seam);
    disposables.push(seamGeometry);

    // Collar the head sits into.
    const collarGeometry = new THREE.TorusGeometry(0.58, 0.042, 12, 72);
    const collar = new THREE.Mesh(collarGeometry, shellSoft);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = BODY_TOP - 0.03;
    bob.add(collar);
    disposables.push(collarGeometry);

    // --- head ---------------------------------------------------------------
    const headPivot = new THREE.Group();
    headPivot.position.set(0, BODY_TOP, 0);
    bob.add(headPivot);

    // Head centre sits one radius above the collar so the sphere rests on it
    // instead of sinking into the shoulders.
    const HEAD_R = 0.95;
    const HEAD_SCALE_Z = 0.96;
    const HEAD_Y = HEAD_R * 0.98 - 0.04;
    const headGeometry = new THREE.SphereGeometry(HEAD_R, 72, 56);
    const head = new THREE.Mesh(headGeometry, shellMaterial);
    head.position.y = HEAD_Y;
    head.scale.set(1, 0.98, HEAD_SCALE_Z);
    headPivot.add(head);
    disposables.push(headGeometry);

    // Ear discs — centred on the silhouette so half of each disc protrudes.
    const earGeometry = new THREE.CylinderGeometry(0.225, 0.225, 0.2, 40);
    [-1, 1].forEach((side) => {
      const ear = new THREE.Mesh(earGeometry, shellSoft);
      ear.rotation.z = Math.PI / 2;
      ear.position.set(side * HEAD_R, HEAD_Y, 0.02);
      headPivot.add(ear);
    });
    disposables.push(earGeometry);

    // --- face assembly ------------------------------------------------------
    // The head's front pole sits at z = HEAD_R * HEAD_SCALE_Z (0.96). A flat
    // disc can never sit flush on a sphere, so the lens housing is a barrel
    // that buries its back end in the head and pushes its face just past the
    // pole — which is exactly how the housing reads on the real renders.
    const FACE_R = 0.62;
    const FACE_FRONT = HEAD_R * HEAD_SCALE_Z + 0.045;
    const faceGroup = new THREE.Group();
    faceGroup.position.set(0, HEAD_Y, 0);
    headPivot.add(faceGroup);

    const barrelGeometry = new THREE.CylinderGeometry(FACE_R, FACE_R + 0.03, 0.66, 72, 1, true);
    const barrel = new THREE.Mesh(barrelGeometry, bezelMaterial);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = FACE_FRONT - 0.33;
    barrel.material.side = THREE.DoubleSide;
    faceGroup.add(barrel);
    disposables.push(barrelGeometry);

    // Outer bezel ring
    const ringGeometry = new THREE.TorusGeometry(FACE_R, 0.032, 16, 80);
    const ring = new THREE.Mesh(ringGeometry, bezelMaterial);
    ring.position.z = FACE_FRONT;
    faceGroup.add(ring);
    disposables.push(ringGeometry);

    // Black glass behind the screen
    const glassGeometry = new THREE.CircleGeometry(FACE_R, 72);
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.z = FACE_FRONT - 0.02;
    faceGroup.add(glass);
    disposables.push(glassGeometry);

    // The LCD itself
    const faceCanvas = document.createElement("canvas");
    faceCanvas.width = FACE_SIZE;
    faceCanvas.height = FACE_SIZE;
    const faceCtx = faceCanvas.getContext("2d")!;
    const faceTexture = new THREE.CanvasTexture(faceCanvas);
    faceTexture.colorSpace = THREE.SRGBColorSpace;
    faceTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: faceTexture,
      toneMapped: false,
      transparent: false,
    });
    const screenGeometry = new THREE.CircleGeometry(FACE_R - 0.055, 72);
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = FACE_FRONT - 0.005;
    faceGroup.add(screen);
    disposables.push(screenGeometry, screenMaterial, faceTexture);

    // --- status LEDs --------------------------------------------------------
    // Seated on the upper front of the head, tilted to sit flush on the curve.
    const headLedGeometry = new THREE.CapsuleGeometry(0.026, 0.19, 4, 12);
    const headLed = new THREE.Mesh(headLedGeometry, ledMaterial);
    headLed.rotation.z = Math.PI / 2;
    headLed.position.set(0, HEAD_Y + 0.765, 0.555);
    headLed.rotation.x = -0.66;
    headPivot.add(headLed);
    disposables.push(headLedGeometry);

    const bodyLedGeometry = new THREE.CapsuleGeometry(0.022, 0.15, 4, 12);
    const bodyLed = new THREE.Mesh(bodyLedGeometry, ledMaterial);
    bodyLed.rotation.z = Math.PI / 2;
    bodyLed.position.set(0, 1.28, 0.932);
    bodyLed.rotation.x = 0.24;
    bob.add(bodyLed);
    disposables.push(bodyLedGeometry);

    // --- wordmark on the chest ---------------------------------------------
    // Painted onto a curved strip so it wraps the body instead of floating.
    const markCanvas = document.createElement("canvas");
    markCanvas.width = 512;
    markCanvas.height = 128;
    const markCtx = markCanvas.getContext("2d")!;
    markCtx.clearRect(0, 0, 512, 128);
    markCtx.fillStyle = "rgba(120,122,126,0.92)";
    markCtx.font = "600 62px Geist, Inter, Helvetica, Arial, sans-serif";
    markCtx.textAlign = "center";
    markCtx.textBaseline = "middle";
    markCtx.fillText("Dwello", 256, 68);
    const markTexture = new THREE.CanvasTexture(markCanvas);
    markTexture.colorSpace = THREE.SRGBColorSpace;
    // Sits just off the shell so it never z-fights with the body surface.
    const markGeometry = new THREE.CylinderGeometry(0.952, 0.952, 0.28, 64, 1, true, -0.42, 0.84);
    const markMaterial = new THREE.MeshStandardMaterial({
      map: markTexture,
      transparent: true,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const mark = new THREE.Mesh(markGeometry, markMaterial);
    mark.position.y = 0.86;
    bob.add(mark);
    disposables.push(markGeometry, markMaterial, markTexture);

    // --- arms ---------------------------------------------------------------
    // Each arm hangs from a shoulder pivot so rotation reads as a real wave.
    // The pivot sits on the shell surface and the resting angle swings the
    // paddle clear of the body silhouette.
    // Rotating a downward-hanging arm by +z swings it toward +x, so the right
    // arm takes the positive angle and the left arm the negative one. Getting
    // this backwards buries both paddles inside the shell.
    const ARM_REST = 0.42;
    const armGeometry = new THREE.CapsuleGeometry(0.2, 0.58, 8, 24);
    const makeArm = (side: -1 | 1) => {
      const pivot = new THREE.Group();
      pivot.position.set(side * 0.84, 1.6, 0.02);
      const arm = new THREE.Mesh(armGeometry, shellSoft);
      arm.position.y = -0.45;
      arm.scale.set(1, 1, 0.5);
      pivot.add(arm);
      pivot.rotation.z = side * ARM_REST;
      bob.add(pivot);
      return pivot;
    };
    const leftArm = makeArm(-1);
    const rightArm = makeArm(1);
    disposables.push(armGeometry);

    // --- contact shadow -----------------------------------------------------
    // A painted gradient rather than a shadow map: cheaper, and it reads better
    // than a real shadow would against the dark page background.
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext("2d")!;
    const shadowGradient = shadowCtx.createRadialGradient(128, 128, 4, 128, 128, 124);
    shadowGradient.addColorStop(0, "rgba(0,0,0,0.62)");
    shadowGradient.addColorStop(0.45, "rgba(0,0,0,0.26)");
    shadowGradient.addColorStop(1, "rgba(0,0,0,0)");
    shadowCtx.fillStyle = shadowGradient;
    shadowCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeometry = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture, transparent: true, depthWrite: false, opacity: 0.85,
    });
    const contactShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.005;
    contactShadow.scale.set(1, 0.62, 1);
    root.add(contactShadow);
    disposables.push(shadowGeometry, shadowMaterial, shadowTexture);

    // ------------------------------------------------------------------ state
    const face: FaceParams = cloneParams(EXPRESSIONS[expression] ?? EXPRESSIONS.happy);
    let blink = 0;
    let nextBlinkAt = performance.now() + 1400;
    let blinkPhase: "idle" | "closing" | "opening" = "idle";
    const look = { x: 0, y: 0 };
    const lookTarget = { x: 0, y: 0 };
    let pointerInside = false;

    // ------------------------------------------------------------- interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.set(nx, -ny);
      lookTarget.x = THREE.MathUtils.clamp(nx, -1, 1);
      lookTarget.y = THREE.MathUtils.clamp(ny, -1, 1);
      pointerInside = true;
    };
    const onPointerLeave = () => {
      pointerInside = false;
      lookTarget.x = 0;
      lookTarget.y = 0;
    };
    const onClick = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      if (raycaster.intersectObject(bob, true).length > 0) handlePoke();
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("pointerdown", onClick);

    // ------------------------------------------------------------------ resize
    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Pull the camera back on narrow viewports so the bot never crops.
      const narrow = THREE.MathUtils.clamp((900 - width) / 620, 0, 1);
      camera.position.z = 9.1 + narrow * 3.0;
      camera.position.y = 2.35 + narrow * 0.12;
      camera.lookAt(0, 1.8 - narrow * 0.05, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // Skip work entirely while the canvas is off-screen.
    let onScreen = true;
    const visibility = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; },
      { rootMargin: "200px" },
    );
    visibility.observe(host);

    // ------------------------------------------------------------------- loop
    let raf = 0;
    let last = performance.now();
    // Greet on arrival: a wave and a hello, shortly after the scene settles.
    const greetAt = performance.now() + 900;
    let greeted = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Only the intersection check gates rendering. Deliberately no
      // `document.visibilityState` check: browsers already stop firing rAF in a
      // genuinely hidden tab, and some embedded browsers report "hidden" while
      // fully visible to the user — which would freeze the bot on screen.
      if (!onScreen) return;

      const t = now / 1000;
      const s = stateRef.current;

      if (!greeted && now >= greetAt) {
        greeted = true;
        if (!reduced) {
          s.waveUntil = now + 2200;
          s.speakUntil = now + 2400;
        }
        onSayRef.current?.("Hey — good to see you. I'm Dwello.");
      }

      // --- face params -----------------------------------------------------
      approachParams(face, s.target, dt, 8);

      // --- blinking --------------------------------------------------------
      if (!reduced) {
        if (blinkPhase === "idle" && now >= nextBlinkAt) blinkPhase = "closing";
        if (blinkPhase === "closing") {
          blink += dt * 13;
          if (blink >= 1) { blink = 1; blinkPhase = "opening"; }
        } else if (blinkPhase === "opening") {
          blink -= dt * 9;
          if (blink <= 0) {
            blink = 0;
            blinkPhase = "idle";
            nextBlinkAt = now + 1800 + Math.random() * 3600;
          }
        }
      }

      // --- gaze ------------------------------------------------------------
      const lookK = 1 - Math.exp(-6 * dt);
      look.x += (lookTarget.x - look.x) * lookK;
      look.y += (lookTarget.y - look.y) * lookK;

      const speaking = now < s.speakUntil;
      drawFace(faceCtx, {
        params: face,
        blink,
        lookX: look.x,
        lookY: look.y,
        time: reduced ? 0 : t,
        speak: speaking ? 1 : 0,
      });
      faceTexture.needsUpdate = true;

      // --- body motion -----------------------------------------------------
      if (reduced) {
        headPivot.rotation.set(0, 0, 0);
        bob.position.y = 0;
      } else {
        // Idle breathing
        const breathe = Math.sin(t * 1.5) * 0.022;
        // Hop on poke: a quick decaying bounce
        let hop = 0;
        if (now < s.hopUntil) {
          const p = 1 - (s.hopUntil - now) / 520;
          hop = Math.sin(p * Math.PI) * 0.16;
        }
        bob.position.y = breathe + hop;

        // The head leads the gaze; the body follows a fraction behind.
        headPivot.rotation.y = look.x * 0.42;
        headPivot.rotation.x = look.y * 0.2;
        headPivot.rotation.z = look.x * -0.07 + Math.sin(t * 0.8) * 0.012;
        root.rotation.y = look.x * 0.12;

        // Face light tracks the head so the chest spill stays believable.
        facePoint.position.set(
          Math.sin(headPivot.rotation.y) * 1.2,
          2.85 + bob.position.y,
          1.4,
        );
      }

      // --- arms ------------------------------------------------------------
      const waving = !reduced && now < s.waveUntil;
      const idleSwing = reduced ? 0 : Math.sin(t * 1.2) * 0.03;
      leftArm.rotation.z = -ARM_REST - idleSwing;

      if (waving) {
        // Swing the right arm up past horizontal, then oscillate it there.
        const remaining = (s.waveUntil - now) / 1000;
        const ramp = THREE.MathUtils.clamp(Math.min(remaining * 2.2, 1), 0, 1);
        const raise = 1.78 * ramp;
        const swing = Math.sin(t * 14) * 0.38 * ramp;
        rightArm.rotation.z = ARM_REST + raise + swing;
        rightArm.rotation.x = -0.3 * ramp;
      } else {
        const k = 1 - Math.exp(-8 * dt);
        rightArm.rotation.z += (ARM_REST + idleSwing - rightArm.rotation.z) * k;
        rightArm.rotation.x += (0 - rightArm.rotation.x) * k;
      }

      // --- LED pulse -------------------------------------------------------
      const pulse = reduced ? 2.4 : 2.1 + Math.sin(t * 2.4) * 0.5 + (speaking ? 1.4 : 0);
      ledMaterial.emissiveIntensity = pulse;
      facePoint.intensity = 1.2 + face.glow * 0.5 + (speaking ? 0.5 : 0);

      // Cursor feedback: the bot is clickable.
      renderer.domElement.style.cursor = pointerInside ? "pointer" : "default";

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    // ---------------------------------------------------------------- cleanup
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("pointerdown", onClick);
      disposables.forEach((item) => item.dispose());
      envRT.dispose();
      scene.environment = null;
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
    // The scene is built once; live values flow through stateRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlePoke]);

  return (
    <div
      ref={hostRef}
      className={className}
      role="img"
      aria-label={`Dwello, a small white desk robot with a round screen face. Current expression: ${EXPRESSION_COPY[expression]?.label ?? "Happy"}.`}
    />
  );
}
