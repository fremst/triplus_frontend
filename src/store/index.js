import { createStore } from "vuex";

export default createStore({
  state: {
    //새로고침하면 없어짐
    loginUser:{id:null,pwd:"",auth:"",name:"",tel:"",gender:"",addr:"",email:"",bdate:"",regdate:"",active:""},
    userId:localStorage.getItem("id")

  },
  getters: {},
  mutations: {
    loginInfo:function(state,payload){
      state.loginUser=payload;
    },
    keepId:function (state,payload){
      if(payload===1){
        state.userId = localStorage.getItem("id");
      }else{
        state.userId =null;
      }

    }

  },
  actions: {
    loginInfo:function(context,payload){
      context.commit('loginInfo',payload);
    }
  },
  modules: {},
});
