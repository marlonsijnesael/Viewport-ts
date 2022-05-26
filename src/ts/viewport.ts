import { Scene, Engine, FreeCamera, HemisphericLight, Nullable, Vector3, Mesh, PointerInfo, EventState, AbstractMesh, MeshBuilder, Color3, Color4, StandardMaterial } from 'babylonjs';
import { GridMaterial } from 'babylonjs-materials';
import InteractionManager from './interactionManager';
import store from '@/store';
import Grid from './grid';


export default class ViewportObject {
    canvas: Nullable<HTMLCanvasElement>
    scene!: Scene;
    engine!: Engine;
    camera!: Nullable<FreeCamera>;
    meshes!: Array<AbstractMesh>;
    light!: Nullable<HemisphericLight>
    interactionManager!: InteractionManager;
    selectedMesh!: AbstractMesh | null;
    grid!: Grid;

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
        this.scene.clearColor = Color4.FromHexString('#262626')
        this.camera = new FreeCamera('mainCamera', new Vector3(0, 5, -10), this.scene)
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(this.canvas, false);
        this.interactionManager = new InteractionManager(this);
        this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        this.grid = new Grid(this.scene)
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

        this.meshes = [sphere]

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

