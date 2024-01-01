<?php
require_once("./configs/databseConn.php");
$code = 200;
$limit = null;
if ($data = file_get_contents("php://input")) {
    $data = json_decode($data, true);
    if (isset($data["limit"])) {
        $limit = $data["limit"];
    }
}
if (!$limit) {
    $limit = 3;
}
try {
    $stmt = $conn->prepare("SELECT * FROM tbl_msgs ORDER BY id DESC LIMIT :USER");
    $stmt->bindParam(':USER', $limit, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response = array("Msg" => "ok", "data" => $result);
    $code = 200;
} catch (\Throwable $th) {
    $response = array("Msg" => "ERROR in query", "Error" => $th->getMessage());
    $code = 500;
}

http_response_code($code);
header('content-type: application/json');
echo json_encode($response);
