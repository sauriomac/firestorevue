import { db, marcaTiempo } from "../firebase";
import { ref } from "vue";
import { useAuth } from "@vueuse/firebase";

export const UseDB= () => {

    const { user } = useAuth();

    const cargando = ref(false);
    const reference = db.collection("todos");

    const getTodos = async () => {
            try {
            cargando.value = true;
            const res = await reference.where("uid", "==", user.value.uid).get();
            return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            } catch (error) {
            console.log(error);
            return {
                error: error,
                res: true,
            };
            } finally {
            cargando.value = false;
            }
      };

        const agregarTodo = async (texto) => {
            console.log("texto", texto);
            try {
                const todo = {
                    texto: texto,
                    fecha: marcaTiempo(),
                    estado: false,
                    uid: user.value.uid,
                };
                const res = await reference.add(todo);
    
                return {
                    id: res.id,
                    ...todo
                };
            } catch (error) {
                return {
                    error: error,
                    res: true
                    }
                }
            };
            const eliminarTodo = async (id) => {
                try {
                await reference.doc(id).delete();
            
                return { res: false };
                } catch (error) {
                return {
                    error: error,
                    res: true,
                };
                }
            };
        
            const modificarTodo = async (todo) => {
                try {
                await reference.doc(todo.id).update({
                    estado: !todo.estado,
                });
            
                return { res: false };
                } catch (error) {
                return {
                    error: error,
                    res: true,
                };
                }
            };
    
        return {
            getTodos,
            cargando,
            agregarTodo,
            eliminarTodo,
            modificarTodo
        };
    }
    