import { AbstractMesh, Color3, GizmoManager } from "babylonjs";
import ViewportObject from "./viewport";

export default class InteractionManager {

    private gizmoManager!: GizmoManager;
    private viewport: ViewportObject;
    private selectedMesh!: AbstractMesh;

    constructor(viewport: ViewportObject,) {
        this.viewport = viewport
        this.initGizmoManager()
    }

    initGizmoManager(): void {
        const scene = this.viewport.getScene
        this.gizmoManager = new GizmoManager(scene)
        this.gizmoManager.usePointerToAttachGizmos = false;

        //initialize gizmos
        this.gizmoManager.gizmos.scaleGizmo;
        this.gizmoManager.gizmos.rotationGizmo;
        this.gizmoManager.gizmos.positionGizmo;

        this.resetGizmos(this.gizmoManager)
        this.addPointerEvents()
    }

    addPointerEvents(): void {
        const scene = this.viewport.getScene;
        this.viewport.addPointerCallback((evt) => {
            if (evt.type === BABYLON.PointerEventTypes.POINTERDOWN) {
                const pickInfo = scene.pick(scene.pointerX, scene.pointerY, undefined, false, this.viewport.camera);
                
                if (pickInfo && pickInfo.pickedMesh) {
                   this.onMeshClicked(pickInfo.pickedMesh);
                }
                else {
                  this.onEmptyClicked();
                }
            }
        })
    }

    onMeshClicked(pickedMesh: AbstractMesh): void{
        //remove current outline (if any)
        this.setOutline(this.selectedMesh, false);
        
        //set selected mesh to picked mesh
        this.selectedMesh = pickedMesh;
        this.setOutline(this.selectedMesh, true);
        this.gizmoManager.attachToMesh(this.selectedMesh)

        //notify viewport of changes
        this.viewport.setSelectedMesh(pickedMesh)
    }

    onEmptyClicked(): void {
        this.setOutline(this.selectedMesh, false);
        this.gizmoManager.attachToMesh(null)
        this.viewport.setSelectedMesh(null)
    }


    setOutline(mesh: AbstractMesh, enable: boolean): void {
        if (!mesh) return
        else if (enable) {
            mesh.outlineColor = Color3.Yellow();
            mesh.renderOutline = true;
        }
        else {
            mesh.renderOutline = false;
        }
    }

    //set position gizmo as default
    resetGizmos(gizmoManager: GizmoManager): void {
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = false;
        gizmoManager.scaleGizmoEnabled = false;
        gizmoManager.boundingBoxGizmoEnabled = false;
    }

}