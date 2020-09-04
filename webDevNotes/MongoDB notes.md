# MongoDB notes

## MongoDB specificities

- Documents in a collection don't have a mandatory fixed set of fields, different documents can have different fields in a same collection (thus no schema).
- A document is nothing more than a key-value pair, like a row in a RDBMS.

--------

## Install MongoDB locally

link: [install](https://www.tutorialspoint.com/mongodb/mongodb_environment.htm)

----------

## Manage the local DBs

The keyword *use* creates a DB, and it also selects the mentioned DB.

```
use DATABASE_NAME
```

To know on which current DB you are, just type *db*.

To know the list of DBs, type *show dbs*

To drop a DB, write:

```
db.dropDatabase()
```

-----------

## Create Collection

The syntax to create a new collection is:

```
db.createCollection(name, options)
```

### Options possibilities (all optional):

- capped - Boolean: if true, the collection has a **fixed size** and automatically overwrites its oldest entries when maximum size is reached.
- autoIndexId - Boolean: if true, creates an index on the id of the elements on the collection.
- size - number: **needed if capped true**, specifies a max size in bytes.
- max - number: specifies the maximum number of documents in the collection.

### Example

```
db.createCollection("mycol", { capped : true, autoIndexID : true, size : 6142800, max : 10000 } ){
    "ok" : 0,
    "errmsg" : "BSON field 'create.autoIndexID' is an unknown field.",
    "code" : 40415,
    "codeName" : "Location40415"
}
```

### Some notes

- *show collections* displays all the collections
- by creating a document, mongoDB will automatically create a collection with it if not yet existing:

```
>db.tutorialspoint.insert({"name" : "tutorialspoint"}),
WriteResult({ "nInserted" : 1 })
```

​	This, for example, will create a document and a collection *tutorialpoint*

- *db.collection.drop()* drops the collection

## MongoDB datatypes (not exhaustive)

- **String** − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.
- **Integer** − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.
- **Boolean** − This type is used to store a boolean (true/ false) value.
- **Double** − This type is used to store floating point values.
- **Min/ Max keys** − This type is used to compare a value against the lowest and highest BSON elements.
- **Arrays** − This type is used to store arrays or list or multiple values into one key.
- **Timestamp** − ctimestamp. This can be handy for recording when a document has been modified or added.
- **Object** − This datatype is used for embedded documents.
- **Null** − This type is used to store a Null value.
- **Symbol** − This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.
- **Date** − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.
- **Object ID** − This datatype is used to store the document’s ID.
- **Binary data** − This datatype is used to store binary data.
- **Code** − This datatype is used to store JavaScript code into the document.
- **Regular expression** − This datatype is used to store regular expression.

## Inserting documents

### Syntax

```
db.collection_name.insert(document)
```

Arrays of documents can also be inserted all at once. The syntax is as follows:

```
db.collection_name.insert(
[
	{
		field1: 'body',
		field2: 'body',
		...(more fields)
	},
	{
		field1: body,
		...(more fields)
	},
	...(more objects)
])
```

### Example

```
db.post.insert([
	{
		title: "MongoDB Overview",
		description: "MongoDB is no SQL database",
		by: "tutorials point",
		url: "http://www.tutorialspoint.com",
		tags: ["mongodb", "database", "NoSQL"],
		likes: 100
	},
	{
	title: "NoSQL Database",
	description: "NoSQL database doesn't have tables",
	by: "tutorials point",
	url: "http://www.tutorialspoint.com",
	tags: ["mongodb", "database", "NoSQL"],
	likes: 20,
	comments: [
		{
			user:"user1",
			message: "My first comment",
			dateCreated: new Date(2013,11,10,2,35),
			like: 0
		}
	]
}
])
BulkWriteResult({
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 2,
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
```

### Save

Save does the same as insert but if an *id_* field is specified it will overwrite the document with the same *id_* in the collection.

### InsertOne

If we want to only insert one document in the collection, we type:

```
db.colection_name.isnertOne(document)
```

### InsertMany

To insert many document at once, we write:

```
db.collection_name.insertMany(
	document_list
)
```

### Warning

It is better to use *insertOne()* & *insertMany()* insead of *insert()* as the latter is deprecated and can have some driver issues.

## Finding documents

### Syntax

```
db.colelction_name.find()
```

This will retrieve all the documents of the collection in an unstructured way.

### pretty

To retrieve the documents in an organized way, use the pretty method:

```
db.collection_name.find().pretty()
```

### findOne

To retrieve a single document, use findOne()

Syntax:

```
db.collection_name.findOne({field : 'body'})
```

Example:

```
db.mycol.findOne({title: "MongoDB Overview"})
```

### Retrieve with conditions

- **Equality**: *db.mycol.find({"by":"tutorials point"}).pretty()*
- **Less Than** : *db.mycol.find({"likes":{$lt:50}}).pretty()*
- **Less Than Equals** : *db.mycol.find({"likes":{$lte:50}}).pretty()*
- **Greater Than** : *db.mycol.find({"likes":{$gt:50}}).pretty()*
- **Greater Than Equals** : *db.mycol.find({"likes":{$gte:50}}).pretty()*
- **Not Equals** : *db.mycol.find({"likes":{$ne:50}}).pretty()*
- **Or for values in an array** : *db.mycol.find({"name":{$in:["Raj", "Ram", "Raghu"]}}).pretty()*
- **Values NOT in an array** : db.mycol.find({"name":{$nin:["Ramu", "Raghav"]}}).pretty()

### AND Example

```
db.mycol.find({ 
	$and: [ 
		{<key1>:<value1>},
         {<key2>:<value2>}
        ] 
})
```

### OR Example

```
db.mycol.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

### XOR Example

```
db.COLLECTION_NAME.find(
	{
		$not: [
			{key1: value1}, {key2:value2}
		]
	}
)
```

### NOT Example

```
>db.COLLECTION_NAME.find(
	{
		$nor: [
			{key1: value1}, {key2:value2}
		]
	}
).pretty()
```

Note: The 2 last are very confusing, need an update.

## Modify documents

### Update

The difference between the *update* and the *save* methods is that update can only change the field of a document while save replaces the whole document and is thus less performant, depending on the situation.

syntax:

```
db.COLLECTION_NAME.update(SELECTION_CRITERIA, UPDATED_DATA)
```

- The *Selection_Criteria* is what is used to choose what needs to be udpated
- The *Updated_Data* is what needs to be replaced

example:

```
db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})
```

Here we select all documents with title 'MongoDB Overview' and change **ONE** title by 'New MongoDB Tutorial'

To change all the titles, need to add the *multi : true* field:

```
db.mycol.update({'title':'MongoDB Overview'},
   {$set:{'title':'New MongoDB Tutorial'}},{multi:true})
```

### findOneAndUpdate

syntax: save as update

### updateOne

syntax:

```
db.COLLECTION_NAME.updateOne(<filter>, <update>)
```

The main difference between *findOneAndUpdate* and *updateOne*, is that the first returns the updated object and the second only if the details of the update.

example for both:

```
db.empDetails.updateOne/findOneAndUpdate(
	{First_Name: 'Radhika'},
	{ $set: { Age: '30',e_mail: 'radhika_newemail@gmail.com'}}
)
```

### updateMany

syntax:

```
db.COLLECTION_NAME.update(<filter>, <update>)
```

example:

```
db.empDetails.updateMany(
	{Age:{ $gt: "25" }},
	{ $set: { Age: '00'}}
)
```

Like *updateOne*, it just returns the detail of the update

## Remove documents

the *remove* method removes one or several documents

syntax:

```
db.collection_name.remove(delletion_criteria, justOne)
```

- *deletion criteria* is the filter that selects the documents we want to delete
- justOne, if set to 1 or true, makes so that the command deletes only one document

example:

```
db.mycol.remove({'title':'MongoDB Overview'}, 1)
```

If we want to delete every document of a selection, we just give *{}* as deletion criteria.

## Projection

The concept of projection is to fetch only the wanted fields of documents instead of the full document. For this we use the *find* method

syntax :

```
db.COLLECTION_NAME.find({},{KEY:1})
```

If a field is set with 1, it will be retrieved and if 0 it wont. Suppose we have documents with an *id_* field and a *title* field and only want to retrieve the titles of the documents. We would write:

```
db.mycol.find({},{"title":1,_id:0})
```

To verify: don't need to put field : 0, except for id_.

## Limiting records

### limit

This method is used to retrieve a limited number of documents.

syntax:

```
db.COLLECTION_NAME.find().limit(NUMBER)
```

### skip

This method skips the specified number of documents.

syntax:

```
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```

## Sorting

The *sort* method is used to sort the retrieved documents with respect to the specified field. 1 -> for ascending order, -1 -> for descending order.

syntax:

```
db.COLLECTION_NAME.find().sort({KEY:1})
```

example:

```
db.mycol.find({},{"title":1,_id:0}).sort({"title":-1})
```

## Indexing

### createIndex

The *createIndex* method creates an index on the specified field to improve the retrieval of documents with respect to this field. As for sort, 1 is for ascending order and -1 for descending order.

syntax:

```
db.COLLECTION_NAME.createIndex({KEY:1})
```

example (with multiple field index):

```
db.mycol.createIndex({"title":1})
```

### parameters

- background - Boolean : whether the indexing should be done in bckgrnd st it doesn't prevent the use of the database. (def: false)
- unique - Boolean : this is so that the indexing will be unique for every document. If we try to insert a document with a same index as another one it will be not be accepted (def: false)
- name - string : the name of the index. (def: fields names)
- sparse - Boolean : only uses fields as references for documents. (def: false)
- expireAfterSeconds - integer : controls how long mongoDB retains documents in this collection.
- weights - document : number from 1->99'999 denoting the significance of the field wrt to the other indexed fields in terms of score.
- default_language - string : determines the list of stop words, the stemmer and tokenizer. (def: English)
- language_override - string : for a text index, specifies the name of the field in the document that contains the language to override the default language.

### dropIndex

syntax

```
db.COLLECTION_NAME.dropIndex({KEY:1})
```

### dropIndexes

removes all specified indexes in the colection

syntax

```
db.COLLECTION_NAME.dropIndexes()
```

### getIndexes

This displays the list of indexes in the collection.

syntax

```
db.COLLECTION_NAME.getIndexes()
```

## Aggregation

syntax:

```
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

we use the *$group* to perform a groupBy and then *_id* to select which field the groupBy is made on. Then we specify the aggregation operation:

```
db.collection_name.aggregate([
	{$group : 
		{
			{_id : 'grouping_field', 'aggregation_name' : 'aggregation_operation'}
		}
	}
])
```

example:

```
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
{ "_id" : "tutorials point", "num_tutorial" : 2 }
{ "_id" : "Neo4j", "num_tutorial" : 1 }
```

This counts the number of documents for each different 'by_user' field.

### aggregation operations

- sum : db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])
- avg : db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])
- min-max : db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])
- push : db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])
- addToSet : db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
- first : db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
- last : db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])

It is possible, on UNIX, to pipeline the results of an aggregation.

# Mongoose notes

