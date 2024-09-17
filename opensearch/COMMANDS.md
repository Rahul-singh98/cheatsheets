# **OpenSearch Cheat Sheet**

## **Index Operations**

### 1. **Create an Index**
```bash
PUT /my_index
```
- Creates a new index named `my_index`.

### 2. **Delete an Index**
```bash
DELETE /my_index
```
- Deletes the `my_index`.

### 3. **Get Index Information**
```bash
GET /my_index
```
- Retrieve details about a specific index.

### 4. **Get All Indexes**
```bash
GET /_cat/indices?v
```
- Returns a list of all indexes.

### 5. **Close an Index**
```bash
POST /my_index/_close
```
- Closes the index to free up system resources.

### 6. **Open a Closed Index**
```bash
POST /my_index/_open
```
- Reopens a closed index.

### 7. **Index Settings (Update)**
```bash
PUT /my_index/_settings
{
  "index": {
    "number_of_replicas": 2
  }
}
```
- Updates index settings, such as the number of replicas.

---

## **Document Operations**

### 1. **Add or Update a Document**
```bash
PUT /my_index/_doc/1
{
  "title": "OpenSearch Guide",
  "description": "A comprehensive guide on OpenSearch."
}
```
- Indexes a document with ID `1`.

### 2. **Get a Document by ID**
```bash
GET /my_index/_doc/1
```
- Retrieves the document with ID `1`.

### 3. **Delete a Document by ID**
```bash
DELETE /my_index/_doc/1
```
- Deletes the document with ID `1`.

### 4. **Search Documents (Basic Query)**
```bash
GET /my_index/_search
{
  "query": {
    "match": {
      "title": "OpenSearch"
    }
  }
}
```
- Searches documents in `my_index` where the field `title` contains the word "OpenSearch".

---

## **Mapping Operations**

### 1. **Define Mappings (Create Index with Mappings)**
```bash
PUT /my_index
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "date": {
        "type": "date"
      }
    }
  }
}
```
- Creates an index with specific field mappings.

### 2. **Update Mappings**
```bash
PUT /my_index/_mapping
{
  "properties": {
    "author": {
      "type": "text"
    }
  }
}
```
- Adds or updates a field in an existing index.

### 3. **Get Index Mappings**
```bash
GET /my_index/_mapping
```
- Retrieves the mapping details of the `my_index`.

---

## **Bulk Operations**

### 1. **Bulk Insert Documents**
```bash
POST /my_index/_bulk
{ "index": { "_id": "1" } }
{ "title": "First document", "content": "This is the first document." }
{ "index": { "_id": "2" } }
{ "title": "Second document", "content": "This is the second document." }
```
- Bulk insert multiple documents in one request.

### 2. **Bulk Delete Documents**
```bash
POST /my_index/_bulk
{ "delete": { "_id": "1" } }
{ "delete": { "_id": "2" } }
```
- Bulk delete documents with specific IDs.

---

## **Search Operations**

### 1. **Match Query**
```bash
GET /my_index/_search
{
  "query": {
    "match": {
      "content": "guide"
    }
  }
}
```
- Returns documents where the `content` field matches the word `guide`.

### 2. **Term Query**
```bash
GET /my_index/_search
{
  "query": {
    "term": {
      "status": "published"
    }
  }
}
```
- Returns documents where the `status` is exactly `published`.

### 3. **Range Query**
```bash
GET /my_index/_search
{
  "query": {
    "range": {
      "date": {
        "gte": "2022-01-01",
        "lte": "2023-01-01"
      }
    }
  }
}
```
- Returns documents where the `date` field is within the given range.

### 4. **Filter Query**
```bash
GET /my_index/_search
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "content": "search"
        }
      },
      "filter": {
        "term": {
          "status": "published"
        }
      }
    }
  }
}
```
- Filters results based on `status` while matching the term `search` in the `content`.

---

## **Cluster Operations**

### 1. **Health Check**
```bash
GET /_cluster/health
```
- Returns the health status of the cluster (green, yellow, or red).

### 2. **Cluster Settings**
```bash
PUT /_cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": "all"
  }
}
```
- Updates persistent settings for the cluster.

---

## **Snapshot and Restore**

### 1. **Create a Snapshot Repository**
```bash
PUT /_snapshot/my_backup
{
  "type": "fs",
  "settings": {
    "location": "/mnt/backups",
    "compress": true
  }
}
```
- Defines a repository for storing snapshots.

### 2. **Take a Snapshot**
```bash
PUT /_snapshot/my_backup/snapshot_1?wait_for_completion=true
```
- Creates a snapshot named `snapshot_1` in the `my_backup` repository.

### 3. **Restore a Snapshot**
```bash
POST /_snapshot/my_backup/snapshot_1/_restore
```
- Restores the snapshot `snapshot_1`.

---

## **Index Aliases**

### 1. **Add Alias**
```bash
POST /_aliases
{
  "actions": [
    {
      "add": {
        "index": "my_index",
        "alias": "my_index_alias"
      }
    }
  ]
}
```
- Adds an alias for `my_index`.

### 2. **Remove Alias**
```bash
POST /_aliases
{
  "actions": [
    {
      "remove": {
        "index": "my_index",
        "alias": "my_index_alias"
      }
    }
  ]
}
```
- Removes the alias `my_index_alias` from `my_index`.

---

## **Basic Monitoring**

### 1. **View Cluster Nodes**
```bash
GET /_cat/nodes?v
```
- Returns information about cluster nodes.

### 2. **View Cluster Health**
```bash
GET /_cat/health?v
```
- Returns health status and related metrics for the cluster.

### 3. **View Pending Tasks**
```bash
GET /_cat/pending_tasks?v
```
- Displays the pending cluster tasks.

---

## **Advanced Search**

### 1. **Aggregation Query**
```bash
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "average_price": {
      "avg": {
        "field": "price"
      }
    }
  }
}
```
- Returns the average value of the `price` field in documents.

### 2. **Terms Aggregation**
```bash
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "status_count": {
      "terms": {
        "field": "status.keyword"
      }
    }
  }
}
```
- Groups documents by the `status` field and counts occurrences.
