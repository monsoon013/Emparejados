<?php

$uri=getenv("MONGODB_URI");

if(!$uri){
    throw new RuntimeException("neno non configuraches a url");
}

$manager = new MongoDB\Driver\Manager($uri);
$coll = "memo_game_db.ranking";

?>