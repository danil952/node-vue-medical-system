import doctorService from '../../service/doctor.service';
import { router } from '../../router';


export default {
    namespaced: true,
    state:
    {
        categories: [],
        freeRecords: [],
        busyRecords: [],
        archiveRecords: [],
        medtypes: [],
        time: ''
    },
    actions:
    {
        getMedtypeByTypeId({commit},{id})
        {
            doctorService.getMedtypeByTypeId(id)
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setMedtypes',res);          
            })
        },
        getCategories({commit})
        {
            doctorService.getCategories()
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setCategories',res);          
            })
        },
        getFreeRecords({commit})
        {

            doctorService.getFreeRecords()
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setFreeRecords',res.tickets);          
            })
        },
        getArchiveRecords({commit})
        {

            doctorService.getArchiveRecords()
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setArchiveRecords',res.tickets);          
            })
        },
        getBusyRecords({commit})
        {

            doctorService.getBusyRecords()
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setBusyRecords',res.tickets);          
            })
        },
        deleteRecord({commit,state},{id})
        {
            doctorService.deleteRecord(id)
            .then(()=>
            {
                commit('setFreeRecords',state.freeRecords.filter(record=>record.id!=id));
            })
        },
        createRecord({commit},{medtype,time,user_id})
        {
            commit('setTime',time)
            const doctor_rec = {
                doctor_id: user_id,
                med_type_id: medtype,
                time: time,
                busy: false
              };
            doctorService.createRecord(doctor_rec)
            .then(()=>
            {
                router.push('/doctor')
            })
        }
    },
    mutations:
    {
        setCategories(state,categories)
        {
            state.categories=categories;
        },
        setFreeRecords(state,records)
        {
            state.freeRecords=records;
        },
        setArchiveRecords(state,records)
        {
            state.archiveRecords=records;
        },
        setBusyRecords(state,records)
        {
            state.busyRecords=records;
        },
        setMedtypes(state,arr)
        {
            state.medtypes=arr;
        },
        setTime(state,time)
        {
            state.time=time;
        }
    }
}