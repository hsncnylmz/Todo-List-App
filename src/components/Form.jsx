import React, { useState } from "react";

function Form({ inputText, setInputText, todos, setTodos, setStatus }) {
    //? input alanını boş bırakmamak için alert ve engelleme fonksiyonu yapıcaz ve bu alertWarning yazdırıcaz
    const [alertWarning, setAlertWarning] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);

    //? Form içinde yazdıklarımızı ekrana yazdırmak için
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    }
    //? form içine yazdıklarımızı görmek için
    const submitTodoHandler = (e) => {
        e.preventDefault();
        //? input'u boş göndermeyi engellemek için
        const isEmpty = str => !str.trim().length;
        if (isEmpty(inputText)) {
            setAlertWarning(true);
            //? Alert in belirli bir süre ardından uyarının gitmesi için
            setTimeout(() => {
                setAlertWarning(false);
            }, 2000);
        }
        else {
            setAlertSuccess(true);
            setTimeout(() => {
                setAlertSuccess(false);
            }, 2000);
            //? input da yazdıklarımızı tutmaya yarayan işlem
            setTodos([
                //? burada "todos" değişkenimizin yazdırılırken ne yapacağını yazıyoruz
                ...todos,
                //? text yazıldığında inputa todolist e geldiğinde completed false yapıyoruz true olduğunda üstünü çizicez
                //? obeje olarak tutacağımız için id belirlemek için "Math.random" kullanıyoruz.
                { text: inputText, completed: false, id: Math.random() }
            ]);
        }

        //? Todo muzu yazdıktan sonra yazı alanımızın boş kalması için bunu kullanıyoruz
        setInputText("");
        console.log(todos);
        /*
        //! deneme setInputText("Hasan")
        //! console.log(inputText);
        */
    }

    const statusHandler = (e) => {
        setStatus(e.target.value)
    }

    return (
        <form>
            <div className="search">
                <input value={inputText} type="text" className="todo-input" placeholder="Yeni bir görev ekle" onChange={inputTextHandler} />
                <button className="todo-button" type="submit" onClick={submitTodoHandler}>
                    <i className="fas fa-plus-circle"></i>
                </button>
            </div>

            <div className="select">
                <select name="todos" className="filter-todo" onChange={statusHandler}>
                    <option value="all">Tüm Yapılacaklar</option>
                    <option value="uncompleted">Yapılacaklar</option>
                    <option value="completed">Yapılmış Görevler</option>
                </select>
            </div>

            <div className="alert-wrapper">
                {alertWarning ?
                    <div className="alert-warning">
                        <div>Todo Yazmadan Geçemezsin!</div>
                    </div> : ""}
                {alertSuccess ?
                    <div className="alert-success">
                        <div>Görev Başarıyla Eklendi</div>
                    </div> : ""}
            </div>

        </form>
    )
}

export default Form