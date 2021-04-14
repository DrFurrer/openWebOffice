<?php
// *****************************************************************
//   Verfasser: Joachim Furrer                                      
//   Erstellt:  21.06.2021                                          
// *****************************************************************

 $OffsetY = 0;
 $u_agent = $_SERVER["HTTP_USER_AGENT"];
 if(preg_match("/Firefox/i", $u_agent)) { 
  $OffsetY = 21;
 }
 
 $LayoutContent = "
  <style type=\"text/css\">
   .ui-layout-north { overflow: hidden; }
   .ui-layout-south { overflow: hidden; }
   .ui-layout-west { border-style: none; overflow: auto; }
   .ui-layout-east { border-style: none; overflow: auto; }
   .ui-layout-center { border-style: none; overflow: auto; }
  </style>
  <script>
   top.ELI('PageInit').style.display = 'block';
   var my".ProjectArt."Layout;
   $(document).ready( function() {
    my".ProjectArt."Layout = \$('body').layout({
     north: { resizable: false, closable: false, initClosed: false, spacing_open: 0, spacing_closed: 0, },
     south: { resizable: false, closable: false, initClosed: false, spacing_open: 0, spacing_closed: 0, },		
     west: { resizable: true, closable: true, initClosed: false, resizeWhileDragging: true, },
     east: { resizable: true, closable: true, initClosed: true, resizeWhileDragging: true, },
     north__size: ".((int)$GLOBALS["fi_GlobalConfigArr"]["CustomerLogo".ProjectArt."_Value3"] + $OffsetY).",
     south__size: ".(46 + $OffsetY).",
     west__size: 346,
     east__size: 376,
     east__fxSpeed: 0,
     west__fxSpeed: 0,
     livePaneResizing: true,
     animatePaneSizing: false,
    });
    top.ELI('PageInit').style.display = 'none';
   });
  </script>
  <!-- Center / Work Area -->
  <div class=\"ui-layout-center fi_AppPaneCenter p-0\" id=\"ContentCenterView\"> 
   ".fi_getBodyBTContent()."
  </div>
  <!-- Left Pane Area -->
  
  <!-- Open Button -->
  <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_zIndex_2 fi_Left_-12 fi_dispNoneImportant\" id=\"WestOpenPaneButton\" style=\"top: ".((int)$GLOBALS["fi_GlobalConfigArr"]["CustomerLogo".ProjectArt."_Value3"])."px;\">
   <a class=\"form-control form-control-sm ms-1 fi_Width_30 fi_Height_42 fi_PT_9 fi_Opacity_08\" href=\"javascript:void(0);\" onclick=\"$('#WestPaneAutoOpenButton').addClass('fi_dispNoneImportant'); $('#WestPaneMouseOver').addClass('fi_dispNoneImportant'); $('#WestStickyPaneButton').addClass('fi_dispNoneImportant'); $('#WestOpenPaneButton').addClass('fi_dispNoneImportant'); my".ProjectArt."Layout.open('west');\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_SidePanelShow"]."\">
    <i class=\"far fa-fw fa-forward fi_NavigationSymbolColor\"></i>
   </a>
  </div>
  
  <!-- Mouse Over Area -->
  <div class=\"fi_positionAbsolute fi_Top_102 fi_Left_0 fi_Width_8 fi_zIndex_2 fi_dispNoneImportant\" id=\"WestPaneMouseOver\" style=\"height: calc(100vh - 148px);\" onmouseover=\"if(ELI('WestPaneAutoOpenCheck').checked == true) { my".ProjectArt."Layout.slideOpen('west'); }\">
  </div>
  
  <div class=\"ui-layout-west fi_NavBarBackground fi_AppPaneLeft p-0\">
   <div id=\"AppPaneLeft\" class=\"p-0\">
  		<div id=\"AppPaneLeftTitle\" class=\"fi_AppPaneLeftTitleDiv fi_AppPaneLeftTitleBackground fi_textAlignCenter fi_vAlignMiddle fi_positionSticky fi_Top_0 fi_Left_0\">
  		 <span class=\"fi_AppPaneLeftTitle\">".$GLOBALS["txt_AppTitle_".ProjectArt]."</span>
     
     <!-- Close Button -->
  		 <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_Top_6 fi_Right_6 fi_zIndex_2\">
      <a class=\"form-control form-control-sm ms-1 fi_Width_36 fi_Opacity_08\" href=\"javascript:void(0);\" onclick=\"ELI('WestPaneAutoOpenCheck').checked = true; $('#WestPaneAutoOpenButton').removeClass('fi_dispNoneImportant'); $('#WestPaneMouseOver').removeClass('fi_dispNoneImportant'); $('#WestStickyPaneButton').removeClass('fi_dispNoneImportant'); $('#WestOpenPaneButton').removeClass('fi_dispNoneImportant'); my".ProjectArt."Layout.close('west');\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_SidePanelHide"]."\">
       <i class=\"far fa-fw fa-backward fi_NavigationSymbolColor\"></i>
      </a>
     </div>
     
     <!-- Pin Button -->
     <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_Top_6 fi_Left_0 fi_zIndex_2 fi_dispNoneImportant\" id=\"WestStickyPaneButton\">
      <a class=\"form-control form-control-sm ms-1 fi_Width_36 fi_Opacity_08\" href=\"javascript:void(0);\" onclick=\"$('#WestPaneAutoOpenButton').addClass('fi_dispNoneImportant'); $('#WestPaneMouseOver').addClass('fi_dispNoneImportant'); $('#WestStickyPaneButton').addClass('fi_dispNoneImportant'); $('#WestOpenPaneButton').addClass('fi_dispNoneImportant'); my".ProjectArt."Layout.open('west');\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_StickSidePanel"]."\">
       <i class=\"far fa-fw fa-thumbtack fi_NavigationSymbolColor\"></i>
      </a>
     </div>
     
     <!-- Auto Open Button -->
     <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_Top_6 fi_Left_40 fi_zIndex_2 fi_dispNoneImportant\" id=\"WestPaneAutoOpenButton\">
      <a class=\"form-control form-control-sm ms-1 fi_Width_36 fi_Opacity_08\" href=\"javascript:void(0);\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_AutoOpenSidePanel"]."\">
       <input class=\"fi_ML_-1 fi_MT_4\" type=\"checkbox\" value=\"\" id=\"WestPaneAutoOpenCheck\">
      </a>
     </div>
     
  		</div>
 		 <div id=\"PaneLeftContent\" class=\"p-2 ps-3\">
   		".fi_getBodyBTNav()."
   	</div>
   </div>
  </div>
  
  <!-- Right Pane Area -->
  
  <!-- Open Button -->
  <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_zIndex_2 fi_Right_-8\" id=\"EastOpenPaneButton\" style=\"top: ".((int)$GLOBALS["fi_GlobalConfigArr"]["CustomerLogo".ProjectArt."_Value3"])."px;\">
   <a class=\"form-control form-control-sm ms-1 fi_Width_30 fi_Height_42 fi_PT_9 fi_Opacity_08\" href=\"javascript:void(0);\" onclick=\"$('#EastPaneAutoOpenButton').addClass('fi_dispNoneImportant'); $('#EastPaneMouseOver').addClass('fi_dispNoneImportant'); $('#EastStickyPaneButton').addClass('fi_dispNoneImportant'); $('#EastOpenPaneButton').addClass('fi_dispNoneImportant'); my".ProjectArt."Layout.open('east');\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_SidePanelShow"]."\">
    <i class=\"far fa-fw fa-backward fi_NavigationSymbolColor\" style=\"margin-left: -7px;\"></i>
   </a>
  </div>
  
  <!-- Mouse Over Bereich -->
  <div class=\"fi_positionAbsolute fi_Top_102 fi_Right_0 fi_Width_8 fi_zIndex_2\" id=\"EastPaneMouseOver\" style=\"height: calc(100vh - 148px);\" onmouseover=\"if(ELI('EastPaneAutoOpenCheck').checked == true) { my".ProjectArt."Layout.slideOpen('east'); }\">
  </div>
  
  <div class=\"ui-layout-east fi_AppPaneRight p-0\">
   <div id=\"AppPaneRight\" class=\"p-0\">
  		<div id=\"AppPaneRightTitle\" class=\"fi_AppPaneRightTitleDiv fi_AppPaneRightTitleBackground fi_textAlignCenter fi_vAlignMiddle fi_positionSticky fi_Top_0 fi_Left_0\">
  		 <span class=\"fi_AppPaneRightTitle\">".$GLOBALS["txt_AppHelperTitle_".ProjectArt]."</span>
     
     <!-- Close Button -->
  		 <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_Top_6 fi_Left_2 fi_zIndex_2\">
      <a class=\"form-control form-control-sm ms-1 fi_Width_36 fi_Opacity_08\" href=\"javascript:void(0);\" onclick=\"ELI('EastPaneAutoOpenCheck').checked = true; $('#EastPaneAutoOpenButton').removeClass('fi_dispNoneImportant'); $('#EastPaneMouseOver').removeClass('fi_dispNoneImportant'); $('#EastStickyPaneButton').removeClass('fi_dispNoneImportant'); $('#EastOpenPaneButton').removeClass('fi_dispNoneImportant'); my".ProjectArt."Layout.close('east');\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_SidePanelHide"]."\">
       <i class=\"far fa-fw fa-forward fi_NavigationSymbolColor\"></i>
      </a>
     </div>
     
     <!-- Pin Button -->
     <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_Top_6 fi_Right_0 fi_zIndex_2\" id=\"EastStickyPaneButton\">
      <a class=\"form-control form-control-sm ms-1 fi_Width_36 fi_Opacity_08\" href=\"javascript:void(0);\" onclick=\"$('#EastPaneAutoOpenButton').addClass('fi_dispNoneImportant'); $('#EastPaneMouseOver').addClass('fi_dispNoneImportant'); $('#EastStickyPaneButton').addClass('fi_dispNoneImportant'); $('#EastOpenPaneButton').addClass('fi_dispNoneImportant'); my".ProjectArt."Layout.open('east');\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_StickSidePanel"]."\">
       <i class=\"far fa-fw fa-thumbtack fi_NavigationSymbolColor\"></i>
      </a>
     </div>
     
     <!-- Auto Open Button -->
     <div class=\"fi_AnimateGrow2 fi_positionAbsolute fi_Top_6 fi_Right_40 fi_zIndex_2\" id=\"EastPaneAutoOpenButton\">
      <a class=\"form-control form-control-sm ms-1 fi_Width_36 fi_Opacity_08\" href=\"javascript:void(0);\" target=\"WorkWindow\" title=\"".$GLOBALS["txt_AutoOpenSidePanel"]."\">
       <input class=\"fi_ML_-1 fi_MT_4\" type=\"checkbox\" value=\"\" id=\"EastPaneAutoOpenCheck\">
      </a>
     </div>
     
  		</div>
 		 <div id=\"PaneRightContent\" class=\"p-2 ps-3\">
     
    </div>
   </div>
  </div>
  <!-- Head Area -->
  <div class=\"ui-layout-north fi_AppPaneHeader fi_MenuTopBackground\">
   <!-- Menu -->
   <nav class=\"navbar navbar-expand-lg pe-3 fixed-top fi_minHeight_".((int)$GLOBALS["fi_GlobalConfigArr"]["CustomerLogo".ProjectArt."_Value3"] + $OffsetY)." fi_MenuTopBackground\" id=\"mainNav\">
    
    <div class=\"ps-3\">".ceAppLogo()."</div>
    
    <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">
     <span class=\"navbar-toggler-icon\"></span>
    </button>
    
    <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">
    
     <ul class=\"navbar-nav ms-auto mb-2 mb-lg-0 ps-3\">

     </ul>
     <ul class=\"navbar-nav mb-2 mb-lg-0\">
    
      <!-- Customer Searchfield -->
      ".ceAppCustomerSearch()."
      
     </ul>
     <ul class=\"navbar-nav mb-2 mb-lg-0\">
      
      <!-- Application Changer -->
      ".ceAppChanger()."
      <!-- Language -->
      ".ceAppLangSwitcher()."
      <!-- Toast Apps -->
      ".ceToastAppSelector()."
      <!-- Settings -->
      ".ceAppSettingSelector()."
      <!-- My Account -->
      ".ceMyAccount()."
      <!-- App Logout -->
      ".ceAppLogoutLink()."
     
     
     </ul>
     
    </div>
    
   </nav>
  </div>
  
  <!-- Footer Area -->
  <div class=\"ui-layout-south fi_AppFooter\">
   <!-- Footer  -->
   ".ceAppFooter()."
  </div>  
  ".fi_pagePageDialogContent()."
 ";
 
?>