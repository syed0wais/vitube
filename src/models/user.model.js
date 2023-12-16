import mongoose,{Schema} from 'mongoose'; 
import jwt from 'jsonwebtoken';     //for generating token
import bcrypt from 'bcrypt';   //for hashing password


const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    avatar:{
        type: String, //cloudinary url
        required: true,
    },
    coverImage:{
        type: String, //cloudinary url
        required: false,
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref: "Video",
    }
,
    password:{
        type: String,
        required: [true,'Password is required'],
    },
    refreshToken:{
        type: String,
       }},{timestamps:true});


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();  //if password is not modified then return next
    this.password =  bcrypt.hash(this.password,10)  //hashing password
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);  //comparing password
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({id:this._id,
        username:this.username,
        email:this.email,
        fullName:this.fullName,
   },process.env.ACCESS_TOKEN_SECRET,{
   expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
   });  //generating token
}

userSchema.methods.generateRefreshToken = function(){   //generating refresh token
    return jwt.sign({id:this._id,
   },process.env.REFRESH_TOKEN_SECRET,{
   expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
   });  
}

export const User = mongoose.model('User',userSchema);
