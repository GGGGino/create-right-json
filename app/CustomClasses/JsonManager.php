<?php

namespace App\CustomClasses;

class JsonManager
{
    /**
     * @var string
     */
    public static $jsonFolder;

    /**
     * @var [String]
     */
    private $jsonInFolder = array();

    public function __construct()
    {
        self::$jsonFolder = __DIR__ . "/../../public/jsons";
    }

    /**
     * Prende tutti nomi dei json che sono dentro la cartella jsons
     *
     * @return array con i nomi dei file
     */
    public function getJsonsInFolder()
    {
        $jsonInFolder = array();

        if ($handle = opendir(self::$jsonFolder)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    $jsonInFolder[] = $entry;
                }
            }
            closedir($handle);
        }

        return $jsonInFolder;
    }

    /**
     * Prendo il json nella cartella e lo modifico interamente conil json passato
     *
     * @param string $name il nome dei file da cercare
     * @return array|string
     */
    public function changeJsonInFolder($name, $schema)
    {
        if( !$name )
            return array();

        $jsons = $this->getJsonsInFolder();
        $name = (strpos($name, '.json') !== false) ? $name : $name . ".json";

        if( !in_array($name, $jsons) )
            return array();

        $fileName = self::$jsonFolder . "/" . $name;

        $myfile = fopen($fileName, "w") or die("Unable to open file!");
        fwrite($myfile, json_encode($schema));
        fclose($myfile);

        return $schema;
    }

    /**
     * Aggiungo un template json
     *
     * @param string $name il nome dei file da cercare
     * @return array|string
     */
    public function addJsonTemplate($name, $schema)
    {
        if( !$name )
            return array();

        $jsons = $this->getJsonsInFolder();
        $name = (strpos($name, '.json') !== false) ? $name : $name . ".json";

        if( in_array($name, $jsons) )
            return false;

        $fileName = self::$jsonFolder . "/" . $name;

        $myfile = fopen($fileName, "w") or die("Unable to open file in create mode!");
        fwrite($myfile, json_encode($schema));
        fclose($myfile);

        return $schema;
    }

    /**
     * Prendo il json completo con il nome $nome e rendo il contenuto del file
     * Il nome può contenere sia il .json che non
     *
     * @param string $name il nome dei file da cercare
     * @return array|string
     */
    public function getJsonDetailInFolder($name)
    {
        if( !$name )
            return array();

        $jsons = $this->getJsonsInFolder();
        $name = (strpos($name, '.json') !== false) ? $name : $name . ".json";

        if( !in_array($name, $jsons) )
            return array();

        $fileName = self::$jsonFolder . "/" . $name;

        $myfile = fopen($fileName, "r") or die("Unable to open file!");
        $schema = fread($myfile, filesize($fileName));
        fclose($myfile);

        $schema = json_decode($schema, true);

        return $schema;
    }
}
