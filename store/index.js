import myState from './state/index'
import myMutation from "./mutation/index"
import myActions from "./action/index"

export const state = () => (myState)
export const mutations = myMutation
export const actions = myActions
// 1개로만 할거면 안합치고 액션 뮤테이션 스테이트 폴더의 index각 파일을 1개로 합쳐도 됨.

// store 를 여러개 만드는 경우가 생김. 모듈화.
// store 복수개의 모듈로 제작된 경우 해당 파일에 다 명시하고
// state, mutation, action 을 모듈별로 디렉터리에 따로 넣는게 좋음.
