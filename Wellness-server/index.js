require("dotenv").config()
const express=require("express")
const cors=require("cors")
const app=express()
const port=process.env.PORT||3000
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.db_name}:${process.env.db_pass}@cluster0.utwtqwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const authenticateJWT=(req,res,next)=>{
  const authHeader=req.headers.authorization;
  if(authHeader)
  {
    const token=authHeader.split(' ')[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err)
        {
          return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user=user;
        next();
    })
  }
   else {
    return res.status(401).json({ message: 'Authorization token required' });
  }
}

async function run() {
  try {
      
    
    const db=client.db("wellness")
    const sessions=db.collection("sessions")
    const users=db.collection("users")
    const JWT_SECRET=process.env.JWT_SECRET
    app.post('/register',async(req,res)=>{
      const {email,password}=req.body;
      const isexisting=await users.findOne({email});
      if(isexisting) 
      {
         return res.status(400).json({ message: 'User already exists' });
      }
      const password_hash=await bcrypt.hash(password,10);
      const result=await users.insertOne({
        email,
        password_hash,
        created_at:new Date(),
        
      })
      const token = jwt.sign(
    { id: result.insertedId.toString(), email },
    JWT_SECRET,
    { expiresIn: '5d' }
  );
       res.status(201).json({ message: 'Registered successfully',token });
    })
     
    app.post('/login',async(req,res)=>{
      const {email,password}=req.body;
      const user=await users.findOne({email});
      if(!user)
      {
        return res.status(404).json({ message: 'User not found' });
      }
      const ismatch=await bcrypt.compare(password,user.password_hash)
      if(!ismatch)
      {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token=jwt.sign(
        {id:user._id.toString(),email:user.email},
        JWT_SECRET,
        {expiresIn:'5d'}
      );
      res.json({token});
    })

app.post('/my-sessions/save-draft', authenticateJWT, async (req, res) => {
  try {
    const { sessionId, title, tags, jsonUrl, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({ message: "Title and status are required." });
    }

    const filter = sessionId 
      ? { _id: new ObjectId(sessionId), user_id: req.user.id } 
      : { user_id: req.user.id, title };

    const updateDoc = {
      $set: {
        title,
        tags,
        json_file_url: jsonUrl,
        status,
        updated_at: new Date()
      },
      $setOnInsert: {
        user_id: req.user.id,
        created_at: new Date()
      }
    };

    const result = await sessions.updateOne(filter, updateDoc, { upsert: true });

    res.status(200).json({ message: `Session ${status} saved successfully`, sessionId: sessionId || result.upsertedId });
  } catch (error) {
    res.status(500).json({ message: "Failed to save session", error: error.message });
  }
});

app.post('/my-sessions/publish', authenticateJWT, async (req, res) => {
  try {
    const { sessionId, title, tags, jsonUrl, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({ message: "Title and status are required." });
    }

    const filter = sessionId 
      ? { _id: new ObjectId(sessionId), user_id: req.user.id } 
      : { user_id: req.user.id, title };

    const updateDoc = {
      $set: {
        title,
        tags,
        json_file_url: jsonUrl,
        status,
        updated_at: new Date()
      },
      $setOnInsert: {
        user_id: req.user.id,
        created_at: new Date()
      }
    };

    const result = await sessions.updateOne(filter, updateDoc, { upsert: true });

    res.status(200).json({ message: `Session ${status} saved successfully`, sessionId: sessionId || result.upsertedId });
  } catch (error) {
    res.status(500).json({ message: "Failed to publish session", error: error.message });
  }
});

    app.get('/sessions',async(req,res)=>{
        const result=await sessions.find({status:'published'}).toArray();
        res.send(result)
    })
     app.get('/my-sessions',authenticateJWT,async(req,res)=>{
       
        const result=await sessions.find({user_id:req.user.id}).toArray();
        res.send(result)
    })
     app.get('/my-sessions/:id',authenticateJWT,async(req,res)=>{
       const id=req.params.id;
        const result=await sessions.findOne({_id:new ObjectId(id)});
        res.send(result)
    })

  } finally {
    
  }
}

run().catch(console.dir);
app.listen((port),()=>{
  console.log("connected")
})
