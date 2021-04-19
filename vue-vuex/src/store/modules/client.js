import userService from '../../service/user.service';


export default {
    namespaced: true,
    state:
    {
        records: [],
        activeRecords: [],
        archiveRecords: []
    },
    actions:
    {
        getRecords({commit},{id})
        {

            userService.getFreeRecordsByType(id)
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setRecords',res.tickets);          
            })
        },
        getActiveRecords({commit})
        {

            userService.getActiveRecords()
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setActiveRecords',res.tickets);          
            })
        },
        getArchiveRecords({commit})
        {

            userService.getArchiveRecords()
            .then((res)=> 
            {
                    return res.json()
            })
            .then(res=>
            {
                commit('setArchiveRecords',res.tickets);          
            })
        },
        createUserRecord({commit,state},{id})
        {
            userService.createRecord(id)
            .then(
                ()=>
                {
                    commit('setRecords',state.records.filter(record=>record.id!=id))
                }
            )
        }
    },
    mutations:
    {
        setRecords(state,records)
        {
            state.records=records;
        },
        setActiveRecords(state,records)
        {
            state.activeRecords=records;
        },
        setArchiveRecords(state,records)
        {
            state.archiveRecords=records;
        }
    }
}