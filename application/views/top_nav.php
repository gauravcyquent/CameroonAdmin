   <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                 
              </div>
              
              <ul class="nav navbar-nav navbar-left">
               <div class="row" style="margin: 8px; color:#6dbe0e;">
                  <div class="col-md-6">
                   <?php if($this->uri->segment(1) == 'Dashboard'){ ?>
                    <h3><strong>Admin Panel Dashboard</strong></h3>
                    <?php }?>
                     <?php if($this->uri->segment(1) == 'Users' && $this->uri->segment(2) == ''){ ?>
                    <h3><strong>User Manangement</strong></h3>
                    <?php }?>
                    <?php if($this->uri->segment(1) == 'Users' && $this->uri->segment(2) == 'Devicelist'){ ?>
                    <h3><strong>User Device Management</strong></h3>
                    <?php }?>
                    <?php if($this->uri->segment(1) == 'Stores'){ ?>
                    <h3><strong>Store Management</strong></h3>
                    <?php }?>
                    <?php if($this->uri->segment(1) == 'Department'){ ?>
                    <h3><strong>Department Management</strong></h3>
                    <?php }?>
                  </div>
                 </div>
              </ul>
             
             

              <ul class="nav navbar-nav navbar-right">
                <li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    Admin
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                   <li><a href="<?php echo base_url();?>Login/Logout"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>


              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->