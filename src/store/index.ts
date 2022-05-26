import ViewportObject from '@/ts/viewport';
import { AbstractMesh, Color3, Color4, StandardMaterial } from 'babylonjs';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface State {
  viewport: ViewportObject | null;
  selectedMesh: AbstractMesh | null;
}

export default new Vuex.Store<State>({
  state: (): State => ({
    viewport: null,
    selectedMesh: null
  }),
  mutations: {
    setViewport: (state: State, viewport: ViewportObject) => {
      state.viewport = viewport;
    },
    setSelectedMesh: (state: State, selectedMesh: AbstractMesh | null) => {
      state.selectedMesh = selectedMesh;
    },
    setClearColor: (state: State, color: Color4) => {
      if (state.viewport) {
        state.viewport.scene.clearColor = color;
      }
    },
    setGridMainColor: (state: State, color: Color3) => {
      if (state.viewport) {
        state.viewport.grid.mainColor = color;
      }
    },
    setGridLineColor: (state: State, color: Color3) => {
      if (state.viewport) {
        state.viewport.grid.lineColor = color;
      }
    },
    setSelectedMeshColor: (state: State, color: Color3) => {
      if (state.selectedMesh && state.selectedMesh.material) {
        const mat = state.selectedMesh.material as StandardMaterial;
        mat.diffuseColor = color;
      }
    }
  },
  getters: {
    getActiveMesh: (state: State) => {
      if (state.selectedMesh) {
        return state.selectedMesh || false
      }
    },
    getScene: (state: State) => {
      if (state.viewport) {
        return state.viewport.scene || false
      }
    },
    getViewport: (state: State) => {
      console.log('hoi')
      return state.viewport || false
    },
    getGrid: (state: State) => {
      if (state.viewport) {
        return state.viewport.grid;
      }
      return false
    }
  }
})
