const {getLogger} = require('../core/logging');
const {models:{kledingstuk,user,kleerkast}} = require('../../models');
const debugLog = (message, meta = {}) => {
   if(!this.logger) this.logger= getLogger();
   this.logger.debug(message, meta);
};
const getAllUsers= async ()=>{
    
    return await user.findAll().then((users)=>{
        debugLog('Alle gebruikers worden opgehaald');
            return {users:users,lengte:users.length};}).catch((error) => {
                debugLog(error);
            });
};

const getUserById=async(id)=>{
    debugLog(`Gebruiker met id ${id} wordt opgehaald`);
    try{
        const gebruiker = await user.findByPk(id);
        if(!gebruiker){
            throw new Error(`Gebruiker met id ${id} bestaat niet`);
        }
        debugLog(`Gebruiker met id ${id} wordt opgehaald`);
        return gebruiker;
    }
    catch(error){
        debugLog(error);
    }
};
    

const  createUser =async ({username, email, password}) => {
    try{const UserwithMail = await user.findOne({ where: {email:email}});
    if(UserwithMail){
        throw new Error(`Er bestaat al een account met email: ${email}`);
    }
        const gebruiker = await user.create({ username:username, email:email, password:password})
        debugLog(`Gebruiker met gebruikersnaam ${username}, email ${email}, passwoord ${password} wordt toegevoegd`);
        return gebruiker;
    }catch(error){
        debugLog(error);
    }
};

const updateUserById = async(id, {name, email, password}) => {
    try{
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw new Error(`Gebruiker met id ${id} bestaat niet`);
        }
        debugLog(`Gebruiker met id ${id} wordt geupdate`);
        return existingUser.update({name:name, email:email, password:password});
    }catch(error){
        debugLog(error);
    }
};

const deleteUserById = async(id) => {
    try{
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw new Error(`Gebruiker met id ${id} bestaat niet`);
        }
        const gebruiker = await user.destroy({ where: {id:id}})
        
        debugLog(`Gebruiker met id ${id} wordt verwijderd`);
        return gebruiker;
    }catch(error){
        debugLog(error);
    }
};
const getAllKledingstukkenOfUserById = async(id) => {
    try{
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw new Error(`Gebruiker met id ${id} bestaat niet`);
        }
        const kledingstukken = await kledingstuk.findAll({where:{userId:id}});
        debugLog(`Kledingstukken van gebruiker met id ${id} worden opgehaald`);
        return {kledingstukken:kledingstukken,lengte:kledingstukken.length};
    }catch(error){
        debugLog(error);
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    getAllKledingstukkenOfUserById
};


