<?php
require_once("./configs/databseConn.php");
$code = 200;
if ($data = file_get_contents("php://input")) {
    $data = json_decode($data, true);
    if ($data != null) {
        if (isset($data["userName"]) && isset($data["Msg"])) {
            $user = $data["userName"];
            $msg = $data["Msg"];
            try {
                $stmt = $conn->prepare("INSERT INTO tbl_msgs (user_name,message) VALUES (:USER,:MSG)");
                $stmt->bindParam(':USER', $user);
                $stmt->bindParam(':MSG', $msg);
                $stmt->execute();
                // $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $response = array("Msg"=>"ok");
                $code = 200;
            } catch (\Throwable $th) {
                $response = array("Msg" => "ERROR in query");
                $code = 500;
            }
        } else {
            $response = array("Msg" => "The params sent are not correct");
            $code = 400;
        }
    } else {
        $response = array("Msg" => "Params are not in Json format");
        $code = 400 ;
    }
}
http_response_code();
header('content-type: application/json');
echo json_encode($response);
