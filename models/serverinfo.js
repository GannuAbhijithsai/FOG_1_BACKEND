const mongoose=require("mongoose");
const Joi=require("joi");

const serverinfoschema=new mongoose.Schema({
    servername:{type:String,required:true,unique:true,},
    players: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    ping: { type: Number, required: true },
    tickrate: { type: Number, required: true },
    settings: {
        region: { type: String, required: true },
        punkbuster: { type: Boolean, required: true },
        fairfight: { type: Boolean, required: true },
        password: { type: Boolean, required: true },
        preset: { type: String, required: true },
      },
      advanced:{
        minimap: { type: Boolean, required: true },
        onlysquad:  { type: Boolean, required: true },
        vehicles:  { type: Boolean, required: true },
        teambalance:  { type: Boolean, required: true },
        minimapspotting:  { type: Boolean, required: true },
        hud:  { type: Boolean, required: true },
        vehiclecam: { type: Boolean, required: true },
        regenerativehealth: { type: Boolean, required: true },
        killcam: { type: Boolean, required: true },
        friendlyfire:  { type: Boolean, required: true },
        spotting:  { type: Boolean, required: true },
        enemynametags: { type: Boolean, required: true },
      },
    
    rules: {
        tickets: { type: Number, required: true },
        vehiclespawndelay: { type: Number, required: true },
        bulletdamage: { type: Number, required: true },
        kickafterteamkills: { type: Number, required: true },
        playerhealth: { type: Number, required: true },
        playerrespawntime: { type: Number, required: true },
        kickafteridle: { type: Number, required: true },
        banafterkicks: { type: Number, required: true },
      }
   

});

const validateA=(serverinfo)=>{
  const schema=Joi.object({
    servername: Joi.string().required(),
  players: Joi.number().required(),
  maxPlayers: Joi.number().required(),
  ping: Joi.number().required(),
  tickrate: Joi.number().required(),
  settings: Joi.object({
    region: Joi.string().required(),
    punkbuster: Joi.boolean().required(),
    fairfight: Joi.boolean().required(),
    password: Joi.boolean().required(),
    preset: Joi.string().required(),
  }).required(),
  advanced:Joi.object({
    minimap:Joi.boolean().required(),
    onlysquad: Joi.boolean().required(),
    vehicles: Joi.boolean().required(),
    teambalance: Joi.boolean().required(),
    minimapspotting:Joi.boolean().required(),
    hud: Joi.boolean().required(),
    vehiclecam:Joi.boolean().required(),
    regenerativehealth:Joi.boolean().required(),
    killcam: Joi.boolean().required(),
    friendlyfire:Joi.boolean().required(),
    spotting: Joi.boolean().required(),
    enemynametags:Joi.boolean().required(),
  }).required(),
  rules: Joi.object({
    tickets: Joi.number().required(),
    vehiclespawndelay: Joi.number().required(),
    bulletdamage: Joi.number().required(),
    kickafterteamkills: Joi.number().required(),
    playerhealth: Joi.number().required(),
    playerrespawntime: Joi.number().required(),
    kickafteridle: Joi.number().required(),
    banafterkicks: Joi.number().required(),
  }).required(),
 
   
  });
  return schema.validate(serverinfo)
}

const Serverinfo=mongoose.model("serverinfo",serverinfoschema);

module.exports={Serverinfo,validateA};