<?php
// submit-lead.php - Safe GoDaddy Proxy for Zoho Flow Webhook
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    
    // Target Zoho Flow webhook URL
    $zohoUrl = "https://flow.zoho.com/892759697/flow/webhook/incoming?zapikey=1001.c272b76efb605d41498f5743e00bf107.0255d1f2e43f57c0313469d6084b132f&isdebug=false";
    
    // Forward the POST request backend-to-backend
    $ch = curl_init($zohoUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $rawInput);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($rawInput)
    ));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    http_response_code($httpCode);
    header("Content-Type: application/json");
    echo json_encode(array("status" => "success", "zoho_response" => $response));
    exit();
} else {
    http_response_code(405);
    echo json_encode(array("error" => "Method not allowed"));
    exit();
}
