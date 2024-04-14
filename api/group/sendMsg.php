<?php
require_once("../configs/databseConn.php");
$code = 200;
if ($data = file_get_contents("php://input")) {
    $data = json_decode($data, true);
    if ($data != null) {
        if (isset($data["userName"]) && isset($data["Msg"]) && isset($data["url"])) {
            $user = $data["userName"];
            $msg = $data["Msg"];
            $_URL = $data["url"];
            
            try {
                $stmt = $conn->prepare("INSERT INTO local_chat_db.tbl_group_msgs (user_name, message, group_url) VALUES (:USER,:MSG,:_URL);");
                $stmt->bindParam(':USER', $user);
                $stmt->bindParam(':MSG', $msg);
                $stmt->bindParam(':_URL', $_URL);
                $stmt->execute();
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
http_response_code($code);
header('content-type: application/json');
echo json_encode($response);
