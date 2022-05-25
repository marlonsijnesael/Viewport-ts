import ViewportObject from '@/ts/viewport';
import { AbstractMesh} from 'babylonjs';
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
    setViewport: (state: State, viewport: ViewportObject)=> {
      state.viewport = viewport;
    },
    setSelectedMesh: (state: State, selectedMesh: AbstractMesh | null)=> {
      state.selectedMesh = selectedMesh;
    }
  },
  getters: {
    getActiveMesh: (state: State)=>{
      if (state.selectedMesh){
        console.log(state.selectedMesh)
        return state.selectedMesh|| false
      }
    }
  }
})
