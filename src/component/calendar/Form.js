import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { editEvent, getUser, postEvent } from '../../actions/users.actions';

const Form = ({planning, id, closeModal, setPlanning, setLoad, detail, startEvent, endEvent, min, max, setLoadCalendarEdit, loadCalendarEdit }) => {
    const [name, setName] = useState(detail ? detail.name : '');
    const [model, setModel] = useState(detail ? detail.model : '');
    const [num, setNum ] = useState(detail ? detail.num : '');
    const [repar, setRepar] = useState(detail ? detail.repar : '');
    const [details, setDetails] = useState(detail ? detail.details : '');
    const [color, setColor] = useState(detail ? detail.color : '#F0F0F0');
    const [loadPlanning, setLoadPlanning] = useState(false);
    const [start, setStart] = useState(detail ? detail.start : startEvent);
    const [end, setEnd] = useState(detail ? detail.end : endEvent);
    const [ct, setCt] = useState(detail ? detail.ct : false);
    const [car, setCar] = useState(detail ? detail.car : false);
    const [urgent, setUrgent] = useState( detail && detail.color === "#FF0000" ? true : false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    let userPlanning = useSelector(state => state.userReducer);
    
    const handleForm = async(e) => {
        e.preventDefault();
        setLoading(true);
        if(detail){
            const eventId = detail._id;
            const data = {eventId, name, model, num, repar, details, color, start, end, ct, car}
            dispatch(editEvent(id, data))
            .then(() => dispatch(getUser(id)))
            .then(() => setLoadPlanning(true))
            .then(() => closeModal())
            setLoad(true)
            setLoadCalendarEdit(false)
        }
        else{
            const data = {name, model, num, repar, details, color, start, end, ct, car}
            dispatch(postEvent(id, data))
            .then(() => dispatch(getUser(id)))
            .then(() => setLoadPlanning(true))
            .then(() => closeModal())
            setLoad(true)
        }
        eraseValue();
    } 

    const eraseValue = () => {
        setName('');
        setModel('');
        setNum('');
        setRepar('');
        setDetails('');
        setColor('');
        setStart('');
        setEnd('');
        setCar(false);
        setCt(false);
    }


    useEffect(() => {
       if(loadPlanning) {
           setPlanning(userPlanning);
           setLoadPlanning(false);
       }

       if(startEvent){
           if(startEvent.getHours() === 0){
                startEvent.setHours(8);
                endEvent.setHours(19);
                endEvent.setUTCDate(endEvent.getUTCDate()- 1);
           }

        }

       urgent ? setColor('#FF0000') : setColor('#F0F0F0'); 

       
    },[userPlanning, dispatch, loadPlanning, setPlanning, urgent, startEvent, endEvent])
    
    const localizer = momentLocalizer(moment);

    const mapToRBCFormat = e => Object.assign({}, e, {
        start: new Date(e.start),
        end: new Date(e.end)
      });

    const handleChangeHours = (e) => {
        setStart(e.start);
        setEnd(e.end);
    }


    return (
        <div className='container_form_new_event'>
            { loading ? (
                <div className='icon' >
                    <i className='fas fa-spinner fa-pulse'></i>
                </div> 
            )
            :
            (

             <form action='' onSubmit={handleForm} autoComplete='off' >
                 { loadCalendarEdit && (
                     <Calendar
                         selectable
                         messages={{ next: 'Suivant', previous: 'Précédent', today: "Aujourd'hui", month: 'Mois', week:'Semaine' }}
                         views={[ 'month' ,'week' ]}
                         defaultView={'week'}
                         localizer={localizer}
                         events={planning.planning.map(mapToRBCFormat)}
                         style={{height :'300px'}}
                         onSelectSlot={e => handleChangeHours(e)}
                         min={min}
                         max={max}
                      />

                 ) }
                    <br/>
                    { start && end && (
                        start.getHours() !== 0 ? ( 

                    <p>
                              {start.getHours()}h{start.getMinutes() === 0 ?  "" : start.getMinutes()} -
                              {end.getHours()}h{end.getMinutes() === 0 ?  "" : end.getMinutes()}
                          
                    </p> 
                    )
                    :
                    (
                    <p>
                          {
                            start.getDate()+start.getMonth() !== end.getDate()+end.getMonth() ?  `Entre le ${start.getDate()}/${start.getMonth() + 1 } et le ${end.getDate()}/${end.getMonth() + 1} `:
                          ` le ${start.getDate()}/${start.getMonth() + 1 }`
                          }
                    </p>

                    )
                    )}
                    <div className='container_form' >
                        <label htmlFor='name'>Nom</label>
                        <br/>
                        <input type='text' name='name' id='name'
                        onChange={e => setName(e.target.value)} value={name}/>
                        <br/>
                        <label htmlFor='model'>Model</label>
                        <br/>
                        <input type='text' name='model' id='model'
                        onChange={e => setModel(e.target.value)} value={model}/>
                        <br/>
                        <label htmlFor='reparation'>Réparation</label>
                        <br/>
                        <input type='text' name='reparation' id='reparation'
                        onChange={e => setRepar(e.target.value)} value={repar}/>
                        <br/>
                        <label htmlFor='number'>Numero</label>
                        <br/>
                        <input type='number' name='number' id='number'
                        onChange={e => setNum(e.target.value)} value={num}/>
                        <br/>
                        <label htmlFor='details'>Détails</label>
                        <br/>
                        <textarea type='text' name='details' id='details'
                        onChange={e => setDetails(e.target.value)} value={details}/>
                        <br/>
                        <input type="checkbox" name='ct' id='ct'
                        onChange={e => setCt(e.target.checked)} checked={ct} />
                        <label htmlFor='ct'>CT</label>
                        <br/>
                        <input type="checkbox" name='car' id='car'
                        onChange={e => setCar(e.target.checked)} checked={car} />
                        <label htmlFor='car'>Prêt véhicule</label>
                        <br/>
                        <input type='checkbox' id='urgent' name='urgent' onChange={e => setUrgent(e.target.checked)} checked={urgent} />
                        <label for="urgent" >Urgent</label>
                        <br/>
                        <input type='submit' value='Envoyer' />
                        <br/>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Form;