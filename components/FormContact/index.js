import css from './FormContact.scss'

export default function index() {

    const formContact = async function(event){
        event.preventDefault();
        
        const nameContact = event.target.nameContact.value
        const emailContact = event.target.emailContact.value
        const subject = event.target.subject.value
        const message = event.target.message.value

        const res = await fetch(`api/send`, {
            body: JSON.stringify({
                nameContact,
                emailContact,
                subject,
                message
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json',
                'Access-Control-Allow-Origin':'*',
            },
            method: 'POST'
        })

        const result = await res.json();

        alert(result.message);

    }
    return (
        <form onSubmit={formContact} id="form-contact" className={css.hero_inputs}>
      <div>
        <div className={css.area}>
          <img src="/profile.svg" alt="icon_name" />
          <input type="text" id="nameContact" placeholder="Nome" />
        </div>
        <div className={css.area}>
          <img src="/email.svg" alt="icon_email" />
          <input type="email" required id="emailContact"  placeholder="E-mail" />
        </div>
        <div className={css.area}>
          <img src="/message.svg" alt="icon_message" />
          <input type="text" id="subject"  placeholder="Mensagem" />
        </div>
        <textarea type="text" placeholder="Descrição" id="message" ></textarea>
        <button type="submit">Enviar</button>
      </div>
    </form>
    )
}
