import { CONSTANTS, HOOKS } from "./constants.js";
import registerHooks from "./hooks.js";
let socket;

export default class API {

    static initialize(){
        registerHooks();
        socket = socketlib.registerModule(CONSTANTS.MODULE_NAME);
        socket.register("call_hook", (...args) => Hooks.call(...args));
    }

    static getActorUuid(target){
        if(!target){
            throw new Error("A target must be given.")
        }
        if(target instanceof Actor){
            return target.uuid;
        }
        return target.actor.uuid;
    }

    static getUsers(users){
        if(typeof users === "string"){
            users = [users];
        }
        if(!Array.isArray(users)){
            return game.users.filter(user => user.active).map(user => user.id);
        }
        return users.map(user => {
            if(typeof user === "string"){
                return game.users.getName(user) || game.users.get(user);
            }
            return (user instanceof User) ? user : false;
        }).filter(Boolean).filter(user => user.active).map(user => user.id);
    }

    static _executeSocketAction(hook, users, ...args){
        return socket.executeForUsers("call_hook", this.getUsers(users), hook, ...args);
    }

    static showBar(target, { users = null, options = {} }={}){
        if(!game.user.isGM) return;
        return this._executeSocketAction(HOOKS.SHOW, users, { uuid: this.getActorUuid(target), ...options });
    }

    static updateBar(target, { options={} }={}){
        if(!game.user.isGM) return;
        return this._executeSocketAction(HOOKS.UPDATE, null, { uuid: this.getActorUuid(target), ...options });
    }

    static closeBar(target, { users = null, options = {} }={}){
        if(!game.user.isGM) return;
        return this._executeSocketAction(HOOKS.CLOSE, users, { uuid: this.getActorUuid(target), ...options });
    }

    static closeAllBars({ users = null, options = {} }={}){
        if(!game.user.isGM) return;
        return this._executeSocketAction(HOOKS.CLOSE_ALL, users, options);
    }

}