import { Scene, Engine, FreeCamera, HemisphericLight, Nullable, Vector3, Mesh } from 'babylonjs';

export default class ViewportObject {
    canvas: Nullable<HTMLCanvasElement>
    scene!: Scene;
    engine!: Engine;
    camera!: Nullable<FreeCamera>;
    meshes!: Array<Mesh>;
    light!: Nullable<HemisphericLight>

    constructor(canvasId: string, addSampleObjects:boolean) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.init()

        if (!addSampleObjects) return;
        this.addSampleObjects()

    }

    init(): void {
        this.engine = new Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true});
        this.scene =  new Scene(this.engine);
        this.camera = new FreeCamera('mainCamera', new Vector3(0,5,-10), this.scene)
        this.camera.setTarget(Vector3.Zero());
        // Attach the camera to the canvas
        this.camera.attachControl( this.canvas, false);

        this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        
        console.log(this)
    }

    addSampleObjects(): void {
          // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
          const sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene, false, Mesh.FRONTSIDE);
          // Move the sphere upward 1/2 of its height
          sphere.position.y = 1;
          // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
          const ground = Mesh.CreateGround('ground1', 6, 6, 2, this.scene, false);
          // Return the created scene
          this.meshes = [sphere, ground]
    }
  }

