import React from 'react'

function Todo({ text, todos, setTodos, todo }) {
    //? todos içine yazdığımız todo ları silmek için kullancağımız fonksiyon
    const deleteHandler = () => {
        //? kullanıcının eklemiş olduğu bilgileri değiştirmek için set kullanıcaz
        //? Eğer todoList den gönderdiğimiz id todo da eşitse silecek
        //? Bunun için filter kullanıcaz
        //* Eğer id si el e eşitse todo ya gönderecek eğer değilse silecek ve tekrar listeyi bize gösterecek
        setTodos(todos.filter((el) => el.id !== todo.id))
    }
    const completeHandler = () => {
        //? Yine aynı işlemi yaparak bu sefer tamamlanan görevleri belirtmek için işareti devreye sokucaz
        //? Tüm elemanları filtreliyoruz ki yalnızca tamamlanmamış olanlara erişebilelim
        //? Bu filitrelenmiş liste üzerinden map ile her bir elemente tek tek geliyorum (map dönüşteki parametre olarak verilen index değerini alır.)
        setTodos(todos.map((item) => {
            //? Bunu yapabilmemizi sağlayacak bir if koşulu var
            //? seçtiğimiz id deki görev tamamlanmışsa todo da tutucaz ve işaretliyicez
            if (item.id === todo.id) {
                return {
                    //? burada ... yı bir nesnenin tüm özelliklerini başka bir nesneye kopyalamak için kullanıyoruz
                    //? yani item değişkenimizi tersine çeviriyoruz 
                    //? yani şöyle ; !item.completed ifadesi bir mantıksal değeri tersine çeviriyor. 
                    //? Burada, completed özelliğinin değeri true ise, !true işlemi gerçekleşeceği için sonuç false olur. 
                    //? Eğer completed özelliğinin değeri false ise, !false işlemi gerçekleşeceği için sonuç true olur.
                    ...item, completed: !item.completed
                }
            }
            //? item dan dönen verimizi alacağız
            return item;
        }))
    }
    return (
        //?* Burada javascript ile bir class ekliyicez ve completeHandler ımız için onClick olduğunda css den çağırdığımız class larımızı true ise üzerini çizecek
        <div className={`todo ${todo.completed ? "completed" : ""}`}>
            <button className="complete-btn" onClick={completeHandler}>
                <i className="fas fa-check-circle"></i>
            </button>
            <li className="todo-item">{text}</li>
            <button className="trash-btn" onClick={deleteHandler}>
                <i className="fa fa-minus-circle"></i>
            </button>
        </div>
    )
}

export default Todo
