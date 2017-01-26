




/*
     FILE ARCHIVED ON 1:37:04 Jul 13, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:28:55 Aug 8, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
 
/*********************************************************************************************************************
 * IE PNG Alpha Fix v1.0 RC4 - /web/20100713013704/http://www.twinhelix.com                          									 *
 *********************************************************************************************************************/

    /* This applys an IE filter to correct the transparency of PNG images */
    if (document.all && document.styleSheets && document.styleSheets[0] && document.styleSheets[0].addRule)
    {
        // Apply the fix to img's
        //document.styleSheets[0].addRule('img', 'behavior: url(/shared/js/iepngfix.htc)');
        // Apply the fix to div's
         //document.styleSheets[0].addRule('div', 'behavior: url(/shared/js/iepngfix.htc)');
    }

/*********************************************************************************************************************
 * CONTENT-SPECIFIC FUNCTIONS                       																 *
 *********************************************************************************************************************/
 
     /* Custom Drop Down List */
     function selectOption(selectedText, selectedValue){
     
        var selectedTextSpan;
        var selectedValueSpan;
        
        selectedTextSpan = document.getElementById('selectedOption');
        selectedValueSpan = document.getElementById('selectedValue');
        
        if (selectedTextSpan){
            selectedTextSpan.innerHTML = selectedText;
        }
        if (selectedValueSpan){
            selectedValueSpan.value = selectedValue;
        }
        
        changeClass('optionList','off');
    }
    function redirect(){
        var selectedValueSpan;
        var url;
        selectedValueSpan = document.getElementById('selectedValue');
        url = selectedValueSpan.value;
        if (url == ''){
            alert('Please choose a site');
        }
        else {
            window.location = url;
        }
    }
 
    /* Open popup */
    function popup(){
        // Open the window
        newPopup = window.open('Popup.htm','popupWindow','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=624,height=767');
        return false;
    }
    function openPopup(){
        // Open the window
        newPopup = window.open('/shared/templates/modules/productpopup.htm','popupWindow','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=500');
        //alert('hello');
    }
    
    /* This wires up the popup windows */
    /* I found this sillliness at: /web/20100713013704/http://www.accessify.com/features/tutorials/the-perfect-popup/ */
    window.onload = function() {
        // check to see that the browser supports the getElementsByTagName method	
        // if not, exit the loop 	
        if (!document.getElementsByTagName){
            return false;
        }
        // create an array of objects of each link in the document 	
        var popuplinks = document.getElementsByTagName("a");	
        // loop through each of these links (anchor tags) 		
        for (var i=0; i < popuplinks.length; i++){			
            // if the link has a rel of "popup"...			
            if (popuplinks[i].rel.indexOf("popup")!=-1){

                // add an onclick event on the fly to pass the href attribute				
                // of the link to our second function, openPopUp 				
                popuplinks[i].onclick = function() {				
                    openPopup('/shared/templates/modules/productpopup.htm');				
                    return false;
                }
            }
        }
    } 

    /* Change the selected product detail tab */
	function selectProductTab(elementId){
	    
	    var i=0;
	    var maxlen=223;
	    var ArrTab=new Array(maxlen)

	    for (i=0;i<maxlen; i++) 
	    {
			ArrTab[i]=new Array(3);
		}
		
		var str;
		//Define all the tab names here
		ArrTab[0][0] = "rates";
		ArrTab[1][0] = "requirements";
		ArrTab[2][0] = "free";
		ArrTab[3][0] = "related";
		ArrTab[4][0] = "account";
		ArrTab[5][0] = "learning";
		ArrTab[6][0] = "addInfo";
		ArrTab[7][0] = "online";
		ArrTab[8][0] = "becSup";
		ArrTab[9][0]= "cerRen";
		ArrTab[10][0] = "comLis";
		ArrTab[11][0] = "polOve";
		ArrTab[12][0] = "guidenlines";
		ArrTab[13][0] = "subReq";
		ArrTab[14][0] = "feaBen";
		ArrTab[15][0] = "terCon";
		ArrTab[16][0] = "feeOpt";
		ArrTab[17][0] = "bulOrd";
		ArrTab[18][0] = "points";
		ArrTab[19][0] = "features";
		ArrTab[20][0] = "relProSer";
		ArrTab[21][0] = "accFea";
		ArrTab[22][0] = "fees";
		ArrTab[23][0] = "tour";	    
		ArrTab[24][0] = "corOpe";
		ArrTab[25][0] = "loaSer";
		ArrTab[26][0] = "infSer";
		ArrTab[27][0] = "comRelFinSer";
		ArrTab[28][0] = "capMar";
		ArrTab[29][0] = "finance";
		ArrTab[30][0] = "boaDir";
		ArrTab[31][0] = "officers";
		ArrTab[32][0] = "corDoc";
		ArrTab[33][0] = "proFea";
		ArrTab[34][0] = "ratFee";		
		ArrTab[35][0] = "relPro";
		ArrTab[36][0] = "redMil";	
		ArrTab[37][0] = "freOnlPayBil";
		ArrTab[38][0] = "touDem";
		ArrTab[39][0] = "onlBan";
		ArrTab[40][0] = "onlBilPay";
		ArrTab[41][0] = "tips";
		ArrTab[42][0] = "plaAccTyp";
		ArrTab[43][0] = "benefits";
		ArrTab[44][0] = "accSer";
		ArrTab[45][0] = "feaAdv";
		ArrTab[46][0] = "feeConLim";
		ArrTab[47][0] = "funOpt";
		ArrTab[48][0] = "tab1Wait";
		ArrTab[49][0] = "tab2Wait";
		ArrTab[50][0] = "tab3Wait";
		ArrTab[51][0] = "tab4Wait";	
		ArrTab[52][0] = "taxCod";	
		ArrTab[53][0] = "solPro";
		ArrTab[54][0] = "leaPro";
		ArrTab[55][0] = "busBen"; 
		ArrTab[56][0] = "empBen";  
		ArrTab[57][0] = "forms";  
		ArrTab[58][0] = "enroll";  
		ArrTab[59][0] = "help";  
		ArrTab[60][0] = "meePro";  
		ArrTab[61][0] = "casYouVot";  		
		ArrTab[62][0] = "plans";
		ArrTab[63][0] = "proDet";
		ArrTab[64][0] = "visBusOpt";	
		ArrTab[65][0] = "rate";
		ArrTab[66][0] = "tecReq";
		ArrTab[67][0] = "relationships";
		ArrTab[68][0] = "industries";
		ArrTab[69][0] = "results";
		ArrTab[70][0] = "achPosPay";
		ArrTab[71][0] = "webAch";
		ArrTab[72][0] = "robRep";
		ArrTab[73][0] = "advantages";
		ArrTab[74][0] = "solutions";
		ArrTab[75][0] = "relSol";
		ArrTab[76][0] = "contacts";
		ArrTab[77][0] = "expertise";
		ArrTab[78][0] = "relSer";	
		ArrTab[79][0] = "experience";	
		ArrTab[80][0] = "whyNatCitBan";
		ArrTab[81][0] = "options";	
		ArrTab[82][0] = "rewBen";
		ArrTab[83][0] = "details";
		ArrTab[84][0] = "rules";
		ArrTab[85][0] = "rotTra";
		ArrTab[86][0] = "stocks";
		ArrTab[87][0] = "bonds";
		ArrTab[88][0] = "spInvAcct";
		ArrTab[89][0] = "compare";
		ArrTab[90][0] = "ageIncomeCont";
		ArrTab[91][0] = "ageIncomeRest";
		ArrTab[92][0] = "contributionLimits";
		ArrTab[93][0] = "conLim";
		ArrTab[94][0] = "security";
		ArrTab[95][0] = "Implementation";
		ArrTab[96][0] = "onlDem";
		ArrTab[97][0] = "rateFee";
		ArrTab[98][0] = "traIra";
		ArrTab[99][0] = "busServc";
		ArrTab[100][0] = "secFea";
		ArrTab[101][0] = "demo";
		ArrTab[102][0] = "benLea";
		ArrTab[103][0] = "aboLea";
		ArrTab[104][0] = "written";
		ArrTab[105][0] = "implied";
		ArrTab[106][0] = "nccFea";
		ArrTab[107][0] = "impNcc";
		ArrTab[108][0] = "ncsFea";
		ArrTab[109][0] = "impNcs";
		ArrTab[110][0] = "written";
		ArrTab[111][0] = "implied";        
		ArrTab[112][0] = "steps";  
		ArrTab[113][0] = "ncsFeaImp";  
		ArrTab[114][0] = "nccFeaImp";  
		ArrTab[115][0] = "sbaLoaGua";  
		ArrTab[116][0] = "cerDevCom";  
		ArrTab[117][0] = "sbaLoaGua";  
		ArrTab[118][0] = "cerDevCom";  
		ArrTab[119][0] = "cardUsg";
		ArrTab[120][0] = "input";  
		ArrTab[121][0] = "result";  
		ArrTab[122][0] = "graphs";
		ArrTab[123][0] = "help";
		ArrTab[124][0] = "tables";
		ArrTab[125][0] = "ab";        
		ArrTab[126][0] = "cd";
		ArrTab[127][0] = "ef";
		ArrTab[128][0] = "gh";
		ArrTab[129][0] = "ij";
		ArrTab[130][0] = "kl";
		ArrTab[131][0] = "mn";
		ArrTab[132][0] = "op";
		ArrTab[133][0] = "qr";
		ArrTab[134][0] = "st";
		ArrTab[135][0] = "uv";
		ArrTab[136][0] = "wx";
		ArrTab[137][0] = "yz";
		ArrTab[138][0] = "inputpop";  
		ArrTab[139][0] = "resultpop";  
		ArrTab[140][0] = "graphspop";
		ArrTab[141][0] = "helppop";
		ArrTab[142][0] = "tablespop";
		ArrTab[143][0] = "num";
		ArrTab[144][0] = "sploffer";
		ArrTab[145][0] = "savcalc";
		ArrTab[146][0] = "waytoapply";
        	ArrTab[147][0] = "busess";
        	ArrTab[148][0] = "ratfea";
        	ArrTab[149][0] = "accserv";
        	ArrTab[150][0] = "busEss";	
        	ArrTab[151][0] = "casMan";	
	  	ArrTab[152][0] = "invOpt";
	  	ArrTab[153][0] = "leaCen";
	  	ArrTab[154][0] = "indPla";
	  	ArrTab[155][0] = "empSpo";
	  	ArrTab[156][0] = "conSer";
	  	ArrTab[157][0] = "resCen";
	  	ArrTab[158][0] = "Plans2";
	  	ArrTab[159][0] = "conAcc";
	  	ArrTab[160][0] = "UGMA";	  	
	  	ArrTab[161][0] = "GifAss";
	  	ArrTab[162][0] = "BliAss";
		ArrTab[163][0] = "addSer";
		ArrTab[164][0] = "cliFocPhi";
		ArrTab[165][0] = "intRes";
		ArrTab[166][0] = "assAll";
		ArrTab[167][0] = "accDeaDisIns";
		ArrTab[168][0] = "lonTerCarIns";
		ArrTab[169][0] = "lifIns";
		ArrTab[170][0] = "annuities";
		ArrTab[171][0] = "indRetAcc";
		ArrTab[172][0] = "setYouCas";
		ArrTab[173][0] = "traYouBus";
		ArrTab[174][0] = "selYouBus";
		ArrTab[175][0] = "maxYouGiv";
		ArrTab[176][0] = "accAcc";
		ArrTab[177][0] = "ageExe";
		ArrTab[178][0] = "estSetSer";
		ArrTab[179][0] = "tesDri";
		ArrTab[180][0] = "video";
		ArrTab[181][0] = "crcDes";
		ArrTab[182][0] = "crcImg";
		ArrTab[183][0] = "insurance";
	    ArrTab[184][0] = "terms";
		ArrTab[185][0] = "helocsploffer";
		ArrTab[186][0] = "helocwaytoapply";
		ArrTab[187][0] = "ONBBillPayment";
		ArrTab[188][0] = "BillsOnline";
		ArrTab[189][0] = "OfficialSweeps";
		ArrTab[190][0] = "Infoapply";
		ArrTab[191][0] = "portCons";
		ArrTab[192][0] = "impNotices";
		ArrTab[193][0] = "sterling";
		ArrTab[194][0] = "NatCityInvestments";
	    ArrTab[195][0] = "BusinessChecking";
	    ArrTab[196][0] = "SweepOptions";
        ArrTab[197][0] = "RemoteDeposit";
	    ArrTab[198][0] = "VendorPayments";
	    ArrTab[199][0] = "collegeRelatedOffer";
        ArrTab[200][0] = "collegeBudgetTips";
	    ArrTab[201][0] = "collegeDegreeCost";
	    ArrTab[202][0] = "productfeatures";
	    ArrTab[203][0] = "HowToSendMoney";
	    ArrTab[204][0] = "rotTra1";
	    ArrTab[205][0] = "Retirement";
	    ArrTab[206][0] = "Investments";
	    ArrTab[207][0] = "EducationSavings";
	    ArrTab[208][0] = "401k";
	    ArrTab[209][0] = "onbAlerts";
	    ArrTab[210][0] = "onbMobile";
	    ArrTab[211][0] = "mobbank";
	    ArrTab[212][0] = "AlertsMobile";
          ArrTab[213][0] = "ToEnroll";
    	    ArrTab[214][0] = "debtconsolidation";
	    ArrTab[215][0] = "homeequity";
	    ArrTab[216][0] = "autofinancing";
	    ArrTab[217][0] = "educationfinancing";
	    ArrTab[218][0] = "personalfinancing";
	    ArrTab[219][0] = "creditcard";	
	    ArrTab[220][0] = "waytoapplychi";
	    ArrTab[221][0] = "howchkrdyworks";
	    ArrTab[222][0] = "autoloanresource";			

	    
	    for (i=0; i<ArrTab.length; i++) 
	    {	    
			// CSS class Name with "Tab"
			ArrTab[i][1] = ArrTab[i][0] + "Tab";

			// Get Element
			ArrTab[i][2] = document.getElementById(ArrTab[i][1]);

			//Reset all the tabs
			if (ArrTab[i][2]) 
			{ 				
				// Handle the class and mouseouts
				if (elementId == ArrTab[i][0]) 
				{ 					
				    ArrTab[i][2].className = 'selected';					
					ArrTab[i][2].onmouseout = function(){this.className = 'selected';} ;					
					
					// Show the selected body
					changeClass(elementId,'selected');
				}
				else
				{	
				    ArrTab[i][2].className = '';
				    ArrTab[i][2].onmouseout = function(){this.className = '';} ;
				    
					// Hide all the bodies
					changeClass(ArrTab[i][0], '');					
				}
			}			
		}
	}
	/* Hover a product detail tab */
	function mouseOverProductTab(elementId){
        // Get a reference to the element
        element = document.getElementById(elementId);
        // Make sure it is not selected already
        if (element.className != 'selected'){
			// Hover the list item
			element.className = 'hover';
		}
	}

    /* The advanced search options */
    function toggleSearch(){
        // Toggle the advanced search menu off/on
        toggleClass('advancedSearch', 'off', 'on');

    }
    function toggleSearchMaskLogin(){
        // Mask the windowed select object (IE6)
        toggleClass('loginSelect', 'unmasked', 'masked');
        // Toggle the advanced search menu off/on
        toggleSearch();

    }
    
    /* The Open/Close link  */
    function toggleLogin(){
        // Toggle the icon next to the Open/Close link
        toggleClass('toggleLogin','down','up');
        // Toggle the link text Open/Close
        toggleText('toggleLogin','Open','Close');
        // Toggle the secure login area
        toggleClass('frmLogin','on','off');
    }

    /* The Open/Close link in the Secure Login Module */
    function toggleSecureLogin(isEnglish){
        // Toggle the icon next to the Open/Close link
        toggleClass('toggleLogin','down','up');
        // Toggle the link text Open/Close
        if (isEnglish)
        {
            toggleText('toggleLogin','Open','Close');
        }
        else
        {
            toggleText('toggleLogin','',''); // TODO:
        }
        // Toggle the secure login area
        toggleClass('frmLogin','on','off');
    }

    function selectOption(linkName, linkUrl){
        window.location = linkUrl;
    }    
    
    /* Hide an element and fill the space it took up */
    function hide(elementId){
        changeClass(elementId, 'off');

    }
    function show(elementId){
        changeClass(elementId, 'on');

    }
    
    /* Hide an element and preserve the space it took up */
    function mask(elementId){
        changeClass(elementId, 'masked');

    }
    function unmask(elementId){
        changeClass(elementId, 'unmasked');

    }
    
    /* Foo */
    function select(elementId){
        changeClass(elementId, 'selected');
    }
    function deselect(elementId){
        changeClass(elementId, '');
    }

/*********************************************************************************************************************
 * UTILITY FUNCTIONS    																							 *
 *********************************************************************************************************************/
 
    /***********************************************************************
     * toggleText           											   *
     ***********************************************************************
     * Switches the innerHTML value of an element between off and on       *
     * Parameters:          											   *
     *   - elementId: The id of the element to switch                      *
     *   - offText: The text for the off state                             *
     *   - onText: The text for the on state                               *
     * Results:             											   *
     *   - If the element was on, it will be off                           *
     *   - If the element was off, it will be on                           *
     ***********************************************************************/
    function toggleText(elementId, offText, onText){
        // Get a reference to the element
        element = document.getElementById(elementId);
        // Make sure the element was on the page
        if (element) {
			// If the element's text is "On"
			if(element.innerHTML == offText){
			    // Turn it "Off"
			    element.innerHTML = onText;
			}
			// If the element's text is "Off"
			else if(element.innerHTML  == onText){
			    // Turn it "On"
			    element.innerHTML = offText;
			}
		}
    }
    
    /***********************************************************************
     * toggleClass          											   *
     ***********************************************************************
     * Switches the className value of an element between off and on       *
     * Parameters:          											   *
     *   - elementId: The id of the element to switch                      *
     *   - offClassName: The class for the off state                       *
     *   - onClassName: The class for the on state                         *
     * Results:             											   *
     *   - If the element was on, it will be off                           *
     *   - If the element was off, it will be on                           *
     ***********************************************************************/
    function toggleClass(elementId, offClassName, onClassName){
        // Get a reference to the element
        element = document.getElementById(elementId);
        // Make sure the element was on the page
        if (element) {
			// If the element's class is "Off"
			if(element.className == offClassName){
			    // Turn it "On"
			    element.className = onClassName;
			}
			// If the element's class is "On"
			else if(element.className == onClassName){
			    // Turn it "Off"
			    element.className = offClassName;
			}
		}
    }
    
    /***********************************************************************
     * changeClass          											   *
     ***********************************************************************
     * Switches the className value of an element                          *
     * Parameters:          											   *
     *   - elementId: The id of the element to switch                      *
     *   - className: The class to set the element to                      *
     * Results:             											   *
     *   - The element will be set to the given class                      *
     ***********************************************************************/
    function changeClass(elementId, className){
        // Get a reference to the element
        element = document.getElementById(elementId);
        // Make sure the element was on the page
        if (element) {
			// Update the element's className property
			element.className = className;
        }
    }
    
    function changeText(elementId, text){
        // Get a reference to the element
        element = document.getElementById(elementId);
        // Make sure the element was found
        if (element) {
			// Update the element's className property
			element.innerHTML = text;
        }
    }
    
    function changeImage(elementId, img) {
        // Get a reference to the element
        element = document.getElementById(elementId)
        // Make sure the element was found
        if (element) {
            // Update the element's path
            element.src = img
        }
    }
    function newImage(arg) {
	    if (document.images) {
		    rslt = new Image();
		    rslt.src = arg;
		    return rslt;
	    }
    }