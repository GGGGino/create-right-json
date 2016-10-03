<?php

/* layout.html.twig */
class __TwigTemplate_6a5fe6395f781c948933bbd41fc33ce65d747ff770ca1c9bfe4563df4be9394e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!doctype html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Create Json</title>
    <link rel=\"stylesheet\" href=\"assets/build/css/main.css\">
    <link rel=\"stylesheet\" href=\"assets/bower_components/bootstrap/dist/css/bootstrap.min.css\">
</head>
<body>
    <nav class=\"navbar navbar-inverse\">
        <div class=\"container-fluid\">
            <div class=\"navbar-header\">
                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">
                    <span class=\"sr-only\">Toggle navigation</span>
                    <span class=\"icon-bar\"></span>
                    <span class=\"icon-bar\"></span>
                    <span class=\"icon-bar\"></span>
                </button>
                <a class=\"navbar-brand\" href=\"#\">Create your json</a>
            </div>
            <div id=\"navbar\" class=\"navbar-collapse collapse\">
                <ul class=\"nav navbar-nav navbar-right\">
                    <li><a href=\"#\">Dashboard</a></li>
                    <li><a href=\"#\">Settings</a></li>
                    <li><a href=\"#\">Profile</a></li>
                    <li><a href=\"#\">Help</a></li>
                </ul>
                <form class=\"navbar-form navbar-right\">
                    <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">
                </form>
            </div>
        </div>
    </nav>

    <div class=\"container-fluid\">
        <div class=\"row\">
            <div class=\"col-sm-4 col-md-3 sidebar\">
                <ul class=\"nav nav-sidebar\">
                    <li class=\"active\"><a href=\"#\">Overview <span class=\"sr-only\">(current)</span></a></li>
                    <li><a href=\"#\">Create json</a></li>
                </ul>

                <h2 class=\"sub-header\">Schemi Json</h2>
                <div id=\"elencoJsonGeneral\"></div>

                <h2 class=\"sub-header\">Section title</h2>
                <div class=\"table-responsive\">
                    <table class=\"table table-striped\">
                        <thead>
                        <tr>
                            <th>Schema</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1,012</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class=\"col-sm-8 col-md-9 main\">
                <h1 class=\"page-header\">Dashboard</h1>

                <div class=\"row\">
                    <div class=\"col-md-6\">
                        <div id=\"todoapp\"></div>
                    </div>
                </div>
                <div class=\"row\">
                    <div class=\"col-xs-12 col-sm-12 placeholder\">

                    </div>
                </div>

                <h2 class=\"sub-header\">Schema</h2>
                <div id=\"schemaDetail\"></div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src=\"assets/build/js/vendor.js\"></script>
    <script src=\"assets/build/js/app.js\"></script>
</body>
</html>";
    }

    public function getTemplateName()
    {
        return "layout.html.twig";
    }

    public function getDebugInfo()
    {
        return array (  19 => 1,);
    }

    public function getSource()
    {
        return "<!doctype html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Create Json</title>
    <link rel=\"stylesheet\" href=\"assets/build/css/main.css\">
    <link rel=\"stylesheet\" href=\"assets/bower_components/bootstrap/dist/css/bootstrap.min.css\">
</head>
<body>
    <nav class=\"navbar navbar-inverse\">
        <div class=\"container-fluid\">
            <div class=\"navbar-header\">
                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">
                    <span class=\"sr-only\">Toggle navigation</span>
                    <span class=\"icon-bar\"></span>
                    <span class=\"icon-bar\"></span>
                    <span class=\"icon-bar\"></span>
                </button>
                <a class=\"navbar-brand\" href=\"#\">Create your json</a>
            </div>
            <div id=\"navbar\" class=\"navbar-collapse collapse\">
                <ul class=\"nav navbar-nav navbar-right\">
                    <li><a href=\"#\">Dashboard</a></li>
                    <li><a href=\"#\">Settings</a></li>
                    <li><a href=\"#\">Profile</a></li>
                    <li><a href=\"#\">Help</a></li>
                </ul>
                <form class=\"navbar-form navbar-right\">
                    <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">
                </form>
            </div>
        </div>
    </nav>

    <div class=\"container-fluid\">
        <div class=\"row\">
            <div class=\"col-sm-4 col-md-3 sidebar\">
                <ul class=\"nav nav-sidebar\">
                    <li class=\"active\"><a href=\"#\">Overview <span class=\"sr-only\">(current)</span></a></li>
                    <li><a href=\"#\">Create json</a></li>
                </ul>

                <h2 class=\"sub-header\">Schemi Json</h2>
                <div id=\"elencoJsonGeneral\"></div>

                <h2 class=\"sub-header\">Section title</h2>
                <div class=\"table-responsive\">
                    <table class=\"table table-striped\">
                        <thead>
                        <tr>
                            <th>Schema</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1,012</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class=\"col-sm-8 col-md-9 main\">
                <h1 class=\"page-header\">Dashboard</h1>

                <div class=\"row\">
                    <div class=\"col-md-6\">
                        <div id=\"todoapp\"></div>
                    </div>
                </div>
                <div class=\"row\">
                    <div class=\"col-xs-12 col-sm-12 placeholder\">

                    </div>
                </div>

                <h2 class=\"sub-header\">Schema</h2>
                <div id=\"schemaDetail\"></div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src=\"assets/build/js/vendor.js\"></script>
    <script src=\"assets/build/js/app.js\"></script>
</body>
</html>";
    }
}
