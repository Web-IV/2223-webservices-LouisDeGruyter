let {KLEDING,KLEERKASTEN} = require('../data/mock-data');
const {getLogger} = require('../core/logging');
const {models:{kledingstuk,user,kleerkast}} = require('../../models');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
const getAll= async ()=>{
    return await kledingstuk.findAll().then((kledingstukken)=>{
        debugLog('Alle kledingstukken worden opgehaald');
            return {kledingstukken:kledingstukken,lengte:kledingstukken.length};
        }).catch((error) => {
                debugLog(error);
            });
};


const getKledingstukById=async(id)=>{
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        debugLog(`Kledingstuk met id ${id} wordt opgehaald`);
        return kledingstukById;
    }
    catch(error){
        debugLog(error);
    }
};
const  create =async ({brand,color, type, size,kleerkastId}) => {
    try{
        let existingKleerkast = await kleerkast.findByPk(kleerkastId);
        if(!existingKleerkast){
            throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
        }
        let newKledingstuk = await kledingstuk.create({brand,color, type, size,kleerkastId});
        existingKleerkast.addKledingstukken(newKledingstuk);
        debugLog(`Kledingstuk met merk ${brand}, kleur ${color}, type ${type} en maat ${size} wordt aangemaakt`);
        return newKledingstuk;
    }
    catch(error){
        debugLog(error);
    }
};
   
const updateKledingStukById = async(id, {brand,color, type, size,kleerkastId}) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        let existingKleerkast = await kleerkast.findByPk(kleerkastId);
        if(!existingKleerkast){
            throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
        }
        let huidigeKleerkast = await kledingstukById.getKleerkast();
        if(huidigeKleerkast.id != kleerkastId){
            huidigeKleerkast.removeKledingstukken(kledingstukById);
            existingKleerkast.addKledingstukken(kledingstukById);
        }
        kledingstukById.brand = brand;
        kledingstukById.color = color;
        kledingstukById.type = type;
        kledingstukById.size = size;
        kledingstukById.kleerkastId = kleerkastId;
        await kledingstukById.save();
        
        debugLog(`Kledingstuk met id ${id} updaten`);
        return kledingstukById;
    } catch(error){
        debugLog(error);
    }
};
const deleteById = async (id) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        return kledingstukById.destroy();
    } catch(error){
        debugLog(error);
    }
   
};
const belongsToUser = async (id) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        const kleerkast1= await kledingstukById.getKleerkast();
        const user1 = await kleerkast1.getUser();
        debugLog(`Kledingstuk met id ${id} hoort bij user met id ${user1.userId}`);
        return user1;
    } catch(error){
        debugLog(error);
    }
};
const belongsToKleerkast = async (id) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        const kleerkast1 = await kledingstukById.getKleerkast();
        debugLog(`Kledingstuk met id ${id} hoort bij kleerkast met id ${kleerkast1.kleerkastId}`);
        return kleerkast1;
    } catch(error){
        debugLog(error);
    }
};
        

module.exports = {
    getAll, getKledingstukById, create, updateKledingStukById, deleteById, belongsToUser, belongsToKleerkast
};