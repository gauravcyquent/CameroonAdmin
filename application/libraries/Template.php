<?php
class Template {

    function load($view,$vars = array())
    {
        $CI = &get_instance();
        $CI->load->view('header', $vars);
        $CI->load->view($view);
        $CI->load->view('footer');
    }

}
?>