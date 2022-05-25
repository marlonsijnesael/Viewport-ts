import { Scene, Engine, FreeCamera, HemisphericLight, Nullable, Vector3, Mesh, PointerInfo, EventState, AbstractMesh } from 'babylonjs';
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
    selectedMesh!: AbstractMesh|null;

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

    init(): void {
        this.engine = new Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this.scene = new Scene(this.engine);
        this.camera = new FreeCamera('mainCamera', new Vector3(0, 5, -10), this.scene)
        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(this.canvas, false);
        this.interactionManager = new InteractionManager(this);

        this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        this.render();

        store.commit('setViewport', this);
    }

    setSelectedMesh(mesh: AbstractMesh|null): void {
        this.selectedMesh = mesh;
        store.commit('setSelectedMesh', mesh);
    }

    addSampleObjects(): void {
        const sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene, false, Mesh.FRONTSIDE);
        sphere.position.y = 1;
        const ground = Mesh.CreateGround('ground1', 6, 6, 2, this.scene, false);
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

