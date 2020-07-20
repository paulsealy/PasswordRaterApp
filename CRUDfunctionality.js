//info cluster

const name = [
  'Liam','Noah','William','James','Oliver','Benjamin','Elijah','Lucas','Mason','Logan','Alexander','Ethan','Jacob','Michael','Daniel','Henry','Jackson','Sebastian','Aiden','Matthew','Samuel','David','Joseph','Carter','Owen','Wyatt','John','Jack','Luke','Jayden',

  'Grace','Fiadh','Sophie','Hannah','Amelia','Ava','Ellie','Ella','Mia','Lucy','Emma','Lily','Olivia','Chloe','Aoife','Caoimhe','Molly','Anna','Sophia','Holly','Freya','Saoirse','Kate','Sadie','Robyn','Katie','Ruby','Evie','Ã‰abha','Cara'
];
const surname = [
  'Murphy','Kelly','Sullivan','Walsh','Smith',"O'Brien",'Byrne','Ryan','Connor',"O'Neill",'Reilly','Doyle','McCarthy','Gallagher','Doherty','Kennedy','Lynch','Murray','Quinn','Moore','McLaughlin','Carroll','Connolly','Daly','Connell','Wilson','Dunne','Brennan','Burke','Collins'
];
const title = [
  'Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr'
];
const houses = [
  'Toy Shoal','Nitzsche Trace','Veum Radial','Queen Forks','Roxanne Mission','Ziemann Points','Von Loop',"O'Kon Burg",'Amiya Fall','Walker Ford'
];
const towns = [
  'North Ramiro','East Berneiceborough','Kemmerberg','South Elroystad','Terryburgh','Port Violaburgh','Hicklehaven','West Josieview','South Alanna','East Leann'
];
const city = [
  'Kildare','Dublin','Cork','Galway','Kerry','Belfast','Wicklow','Waterford','Canan','Kilkenney'
];
const manu = [
  'Samsung','Apple','Nokia','Huawei','HTC'
];
const emails =[
  'gmail.com','hotmail.ie','yahoo.com','live.ie','outlook.ie','mumail.ie'
];
var fname = name[Math.floor(Math.random(60)*60)], lname = name[Math.floor(Math.random(60)*60)];

//Generators
function getTitle() {
  return title[Math.floor(Math.random(6)*6)];
} 
function getFname(){
  fname = name[Math.floor(Math.random(60)*60)];
  return fname;
}
function getLname(){
  lname = surname[Math.floor(Math.random(30)*30)];
  return lname;
}
function getMobile(){
  var data = "08";
  for(i=0; i<8; i++){
      data+= Math.floor(Math.random(10)*10);
  }
  return data;
}
function getEmail(){
  var email = fname+"_"+lname+"@"+emails[Math.floor(Math.random(5)*5)];
  return email;
}
function getLine1(){
  var line1="";
  line1+= Math.floor(Math.random(1000)*1000)+" "+houses[Math.floor(Math.random(10)*10)];
  return line1;
}
function getTown(){
  return towns[Math.floor(Math.random(10)*10)];
}
function getCity(){
  return city[Math.floor(Math.random(10)*10)];
}
function getEircode(){
  function letter(){
    return String.fromCharCode(65+Math.floor(Math.random(26)*26));
  }
  function number(){
    return Math.floor(Math.random(10)*10);
  }
  var code = letter()+number()+""+number()+" "+letter()+number()+letter()+number();
  return code;
}
function getManufacturer(){
  return manu[Math.floor(Math.random(5)*5)];
}
function getModel(){
  var model = String.fromCharCode(65+Math.floor(Math.random(26)*26));
  for(i=0;i<8;i++)model+=Math.floor(Math.random(9)*9);
  return model;
}
function getPrice(){
  var price = 100+Math.floor(Math.random(300)*300);
  var price2 = Math.floor(Math.random(10)*10)+""+Math.floor(Math.random(10)*10);
  return "$"+price+"."+price2;
}

const MongoClient = require("mongodb").MongoClient;
//const url = "mongodb+srv://adminUser:hello@cluster0-cbdiw.mongodb.net/test?retryWrites=true&w=majority"
const url = "mongodb+srv://laurence:Buggy@cluster0-3hnse.mongodb.net/test?retryWrites=true&w=majority";
const dbname = 'app_test';

//CRUD Customer
function createCustObj(){
  //Create a customer document object
  var obj = {
    Title: getTitle(), 
    Fname: getFname(),
    Lname: getLname(),
    Mobile: getMobile(),
    Email: getEmail(),
  };
  return obj;
}
function insertCustomer(obj){
  //Insert obj into the `Customer` collection
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("People");
    console.log("Connected to `"+dbname+"`...");

    //We are connected now, insert the obj
    collection.insertOne(obj, function(err,res){
      if(err) throw(err);
      console.log("Item inserted :");
      console.log(obj);
      
      //Close th connection
      client.close();
      console.log("...Disconnected");
    });
  });
}
//Retreive a random Customer
function findCustomer(){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Customer");
    console.log("Connected to `"+dbname+"`...\n");
    
    collection.find({}).toArray(function(err,result){
      if(err) throw(err);
      var randCust = Math.floor(Math.random(result.length)*result.length);

      //Display their details, not the raw packet
      console.log("Name: "+result[randCust].Title+" "+result[randCust].Fname+" "+result[randCust].Lname);
      console.log("Mobile: "+result[randCust].Mobile);
      console.log("Email: "+result[randCust].Email+"\n");
      console.log("Line1: "+result[randCust].address.Line1);
      console.log("Line2: "+result[randCust].address.Line2);
      console.log("Town: "+result[randCust].address.Town);
      console.log("CityOrCounty: "+result[randCust].address.CityOrCounty);
      console.log("Eircode: "+result[randCust].address.Eircode);

      //close the connection
      console.log("...Disconnected");
      client.close();
    });
  });
}
function updateCustomer(){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Customer");
    console.log("Connected to `"+dbname+"`...\n");

    var query = {};
    var newVals = {
      $set: {
        "Mobile": getMobile(), 
        "Title": getTitle(),
        "Email": getEmail(),
        "address.Line1": getLine1(),
        "address.Town":getTown(),
        "address.CityOrCounty":getCity(),
        "address.Eircode": getEircode()
      }
    };

    collection.updateOne(query, newVals, function(err, res){
      if(err) throw(err);
      console.log("1 item updated \n");

      client.close();
      console.log("...Disconnected");
    });
  });
}
//Takes in a customer email and phone and deletes all customer with matching records
function dropCustomer(email,phone){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Customer");
    console.log("Connected to `"+dbname+"`...\n");

    var query = { "Email" : email, "Phone": phone};
    collection.deleteMany(query, function(err,res){
      if(err) throw err;
      console.log("1 item deleted\n");
      client.close();
      console.log("...Disconnected");
    });
  });
}

//CRUD Items
function createPhoneObj(){
  var obj = {
    Manufacturer: getManufacturer(),
    Model: getModel(),
    Price: getPrice(),
  }
  return obj;
}
function insertPhone(obj){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Phone");
    console.log("Connected to `"+dbname+"`...");

    collection.insertOne(obj, function(err,res){
      if(err) throw(err);
      console.log("Item inserted :");
      console.log(obj);
  
      client.close();
      console.log("...Disconnected");
    });
  });
}
function findPhone(){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Phone");
    console.log("Connected to `"+dbname+"`...\n");
    
    collection.find({}).toArray(function(err,result){
      if(err) throw(err);
      var rand = Math.floor(Math.random(result.length)*result.length);

      console.log("Manufacturer: "+result[rand].Manufacturer);
      console.log("Model: "+result[rand].Model);
      console.log("Price: "+result[rand].Price+"\n");

      console.log("...Disconnected");
      client.close();
    });
  });
}
function updatePhone(){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Phone");
    console.log("Connected to `"+dbname+"`...\n");

    var query = {"Manufacturer": "Samsung"};
    var newVals = {$set: {Price: "$150"}};

    collection.updateOne(query, newVals, function(err, res){
      if(err) throw(err);
      console.log("1 item updated \n");

      client.close();
      console.log("...Disconnected");
    });
  });
}
function dropPhone(){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Phone");
    console.log("Connected to `"+dbname+"`...\n");

    var query = {"Manufacturer": "Samsung"};
    collection.deleteOne(query, function(err,res){
      if(err) throw err;
      console.log("1 item deleted\n");
      client.close();
      console.log("...Disconnected");
    });
  });
}

//CRUD Orders
function ordered(customer,item){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Order");
    console.log("Connected to `"+dbname+"`...");

    var obj = {
      "Customer_id" : customer,
      "Item_id" : item
    }

    collection.insertOne(obj, function(err,res){
      if(err) throw(err);
      console.log("Item inserted :");
      console.log(obj);
  
      client.close();
      console.log("...Disconnected");
    });
  });
}
function findOrder(){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Orders");
    console.log("Connected to `"+dbname+"`...\n");
    
    collection.find({}).toArray(function(err,result){
      if(err) throw(err);
      var rand = Math.floor(Math.random(result.length)*result.length);

      console.log("Customer_id: "+result[rand].Customer_id+", ordered: Item_id"+result[rand].Item_id);

      console.log("...Disconnected");
      client.close();
    });
  });
}
function dropOrder(customer,item){
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) throw error;
    var db = client.db(dbname);
    var collection = db.collection("Orders");
    console.log("Connected to `"+dbname+"`...\n");

    var query = {"Customer_id": customer, "Item_id": item};

    collection.deleteMany(query, function(err,res){
      if(err) throw err;
      console.log("Item(s) deleted\n");
      client.close();
      console.log("...Disconnected");
    });
  });
}


main();
function main(){
  //insertCustomer(createCustObj());
  //findCustomer();
  //updateCustomer();
  //dropCustomer("Sebastian_Amelia@gmail.com","0897141931");

  //insertPhone(createPhoneObj());
  //findPhone();
  //updatePhone();
  //dropPhone();

  //ordered("5ea36096a8ee24675c22f0c2","5ea360b5f7802a32f0cb1b4d");
  //findOrder();
  //dropOrder();
}


	
	
	
