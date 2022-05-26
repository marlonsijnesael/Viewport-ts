import { AbstractMesh, Color3, MeshBuilder, Scene } from "babylonjs";
import { GridMaterial } from "babylonjs-materials";

export default class Grid {
    private scene: Scene;
    private material!: GridMaterial
    public mesh!: AbstractMesh;


    constructor(scene: Scene) {
        this.scene = scene;
        this.init()
    }

    init(): void {
        this.mesh = MeshBuilder.CreateGround("ground", { width: 128, height: 128, subdivisions: 100 }, this.scene)
        this.material = new GridMaterial("groundMat", this.scene);
        this.material.majorUnitFrequency = 5;
        this.material.minorUnitVisibility = 0.45;
        this.material.gridRatio = 2;
        this.material.backFaceCulling = false;
        this.material.mainColor = new BABYLON.Color3(1, 1, 1);
        this.material.lineColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        this.material.opacity = 0.98;
        this.material.lineColor = new BABYLON.Color3(0, 1.0, 1.0);
        this.mesh.material = this.material;
        this.mesh.updateFacetData();
        this.mesh.isPickable = false;
    }

    get mainColor() {
        return this.material.mainColor;
    }

    set mainColor(value: Color3) {
        this.material.mainColor = value;
    }

    get lineColor() {
        return this.material.lineColor;
    }

    set lineColor(value: Color3) {
        this.material.lineColor = value
    }

}