import pymongo

mongoConnection = pymongo.MongoClient(host='localhost',port = 27017)

def insert_one(username,doc):
    #如果不存在Mongodb会自动创建
    db = mongoConnection['user_'+username]
    cl = db.dataset
    result = cl.insert_one(doc)
    return result

def find_one(para):
    db = mongoConnection['user_cwj']
    cl = db.cwjghg
    result = cl.find_one({'tittle':'cwjghg'})
    return result