# List Listeners for a Load Balancer  

This request lists listeners for a load balancer.  

## **GET /load_balancers/{load_balancer_id}/listeners**  

### **Authorization**  
To call this method, you must be assigned one or more IAM access roles that include the following action. You can check your access by going to **Users > User > Access**.  

- `is.load-balancer.load-balancer.view`  

### **Auditing**  
Calling this method generates the following auditing event:  

- `is.load-balancer.load-balancer-listener.read`  

## **Request**  

### **Path Parameters**  

| Parameter          | Required | Type   | Description                         | Constraints |
|--------------------|----------|--------|-------------------------------------|-------------|
| `load_balancer_id` | **Yes**  | string | The load balancer identifier.       | Length: 1–64, must match regex `^[-0-9a-z_]+$` |

### **Query Parameters**  

| Parameter  | Required | Type    | Description                                                 | Constraints |
|------------|----------|---------|-------------------------------------------------------------|-------------|
| `version`  | **Yes**  | string  | The API version in format `YYYY-MM-DD`.                    | Length: 10, must match regex `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$` |
| `generation` | **Yes**  | int32   | The infrastructure generation. Must be `2`.                | Allowed values: `[2]` |

### **Example Request**  

```sh
curl -X GET "$vpc_api_endpoint/v1/load_balancers/$load_balancer_id/listeners?version=2025-03-18&generation=2" \
-H "Authorization: Bearer $iam_token"
