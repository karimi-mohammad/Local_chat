<?php
require_once("../configs/databseConn.php");
$code = 200;
try {
    $stmt = $conn->prepare("SELECT tg.id, tg.name, tg.url FROM local_chat_db.tbl_groups tg ");
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
