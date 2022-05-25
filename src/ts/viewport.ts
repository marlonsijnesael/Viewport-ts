import { Scene, Engine, FreeCamera, HemisphericLight, Nullable, Vector3, Mesh, PointerInfo, EventState, AbstractMesh, MeshBuilder, Color3, Color4, StandardMaterial } from 'babylonjs';
import { GridMaterial } from 'babylonjs-materials';
import InteractionManager from './interactionManager';
import store from '@/store';

export default class ViewportObject {
    canvas: Nullable<HTMLCanvasElement>
    scene!: Scene;
    engine!: Engine;
    camera!: Nullable<FreeCamera>;
    meshes!: Array<Mesh>;
    light!: Nullable<HemisphericLight>
    interactionManager!: InteractionManager;
    selectedMesh!: AbstractMesh | null;

    constructor(canvasId: string, addSampleObjects: boolean) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.init()

        if (!addSampleObjects) return;
        this.addSampleObjects()
    }

    get getScene() {
        return this.scene;
    }

    get getSelectedMesh() {
        return this.selectedMesh
    }

    get getSceneColor() {
        return this.scene.clearColor;
    }

    init(): void {
        this.engine = new Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1)
        this.camera = new FreeCamera('mainCamera', new Vector3(0, 5, -10), this.scene)
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(this.canvas, false);
        this.interactionManager = new InteractionManager(this);
        this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        this.render();
    }

    setSelectedMesh(mesh: AbstractMesh | null): void {
        this.selectedMesh = mesh;
        store.commit('setSelectedMesh', mesh);
    }

    addSampleObjects(): void {
        const sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene, false, Mesh.FRONTSIDE);
        sphere.position.y = 1;
        const sampleMaterial = new StandardMaterial("myMaterial", this.scene);
        sampleMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
        sphere.material = sampleMaterial;
        const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100, subdivisions: 100 }, this.scene)
        const groundMaterial = new GridMaterial("groundMat", this.scene);
        groundMaterial.majorUnitFrequency = 5;
        groundMaterial.minorUnitVisibility = 0.45;
        groundMaterial.gridRatio = 2;
        groundMaterial.backFaceCulling = false;
        groundMaterial.mainColor = new BABYLON.Color3(1, 1, 1);
        groundMaterial.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        groundMaterial.opacity = 0.98;
        groundMaterial.lineColor = new BABYLON.Color3(0, 1.0, 1.0);
        ground.material = groundMaterial;
        ground.updateFacetData();
        ground.isPickable = false;

        this.meshes = [sphere, ground]

    }

    render(): void {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    addPointerCallback(callback: (eventData: PointerInfo, eventState: EventState) => void) {
        this.scene.onPointerObservable.add(callback);
    }
}

