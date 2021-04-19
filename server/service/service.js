const userRep = require('../repositories/userRep')
const doctorRep = require('../repositories/doctorRep')

async function getUserByUsername(username)
{
    const user= await userRep.findByUsername(username)
    if(user==null)
    {
        return null;
    }
    else
    {
        return user;
    }
    
}

async function getDoctorByUsername(username)
{
    const doctor= await doctorRep.findByUsername(username)
    if(doctor==null)
    {
        return null;
    }
    else
    {
        return doctor;
    }
    
}

module.exports = { getUserByUsername,getDoctorByUsername }