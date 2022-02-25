function GoToSQA()
{
	console.log('in GoToSQA function');
	var env_value = document.getElementById("ENV").value, ins_ID = document.getElementById("floatingInput").value, debug_mode = document.getElementById("DebugMode"), url="";
	console.log("env_value= "+env_value);
	console.log("ins_ID= "+ins_ID);
	console.log("debug_mode= "+debug_mode);
	if (debug_mode.checked) {
		switch(env_value.valueOf()) 
			{
				// URL example: // https://sqa-ap01.alma.exlibrisgroup.com/mng/login?institute=61USC_INST&&productCode=esploro&debug=true&auth=local
				case "AP01":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "NA01":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "NA02":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "NA03":
				url="https://sqa03-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "NA04":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "NA05":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "CN01":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "EU00":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "EU01":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "EU02":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "EU03":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
				case "EU04":
				url="https://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID +"&productCode=esploro&debug=true&auth=local";
				break;
			}
	} else {
		switch(env_value.valueOf()) 
			{
				case "AP01":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "NA01":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "NA02":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "NA03":
				url="http://sqa03-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "NA04":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "NA05":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "CN01":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "EU00":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "EU01":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "EU02":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "EU03":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
				case "EU04":
				url="http://sqa-" + env_value + ".alma.exlibrisgroup.com/mng/login?institute="+ ins_ID+"&productCode=esploro&auth=local";
				break;
			}
	}

	
	window.open(url,'_blank');
return false;
}

function RunAPI()
{
	console.log('in RunAPI() function')
	var env_value = document.getElementById("ENVAPI").value, ins_ID_API = document.getElementById("instIDAPI").value, API_val = document.getElementById("APIVal").value;
	console.log("env_value= "+env_value);
	console.log("ins_ID_API= "+ins_ID_API);
	console.log("API_val= "+API_val);

	// base url example:
	// https://AlmaSDK-exl_impl-institutionCode-972WIS_INST:a12345678A@sqa-eu02.alma.exlibrisgroup.com/esploro-api/v1/researchers/1234?user_id_type=all_unique&view=full&expand=none

	url="https://AlmaSDK-exl_impl-institutionCode-" + ins_ID_API + ":a12345678A" + "@sqa-" + env_value + ".alma.exlibrisgroup.com/esploro-api" + API_val;
	var WindowAlert = {
		A: function () {alert(url)}
	}
	WindowAlert.A();
	

	//console.log(url);
	window.open(url,'_blank');
return false;
}


function fillOutDropMenu(s1,s2) {
	var s1 = document.getElementById('API');
	var s2 = document.getElementById('Resource');
	s2.innerHTML = "";
	if(s1.value == "Researchers"){
		var optionArray = ["|","/v1/researchers|/v1/researchers", "/v1/researchers/{researcheID}|/v1/researchers/{researcheID}", "/v1/researchers/{orcid:.+}/token|/v1/researchers/{orcid:.+}/token", "/v1/researchers/test|/v1/researchers/test"];
		}else if(s1.value == "Assets"){
		var optionArray = ["|","/v1/assets|/v1/assets", "/v1/assets/{assetIds}|/v1/assets/{assetIds}", "/v1/assets/test|/v1/assets/test"];
	}else if(s1.value == "Configurations"){
		var optionArray = ["|","/v1/researchconf/code-tables/{codeTableName}|/v1/researchconf/code-tables/{codeTableName}", "/v1/researchconf/md-import-profiles|/v1/researchconf/md-import-profiles","/v1/researchconf/md-import-profiles/{profile_id}|/v1/researchconf/md-import-profiles/{profile_id}", "/v1/researchconf/jobs|/v1/researchconf/jobs", "/v1/researchconf/jobs/{job_id}|/v1/researchconf/jobs/{job_id}", "/v1/researchconf/jobs/{job_id}/instances|/v1/researchconf/jobs/{job_id}/instances", "/v1/researchconf/jobs/{job_id}/instances/{instance_id}|/v1/researchconf/jobs/{job_id}/instances/{instance_id}", "/v1/researchconf/sets|/v1/researchconf/sets", "/v1/researchconf/sets/{set_id}|/v1/researchconf/sets/{set_id}", "/v1/researchconf/sets/{set_id}/members|/v1/researchconf/sets/{set_id}/members", "/v1/researchconf/test|/v1/researchconf/test"];
	}else if(s1.value == "Analytics"){
	var optionArray = ["|","/v1/researchanalytics/paths|/v1/researchanalytics/paths", "/v1/researchanalytics/paths/{path:.+}|/v1/researchanalytics/paths/{path:.+}", "/v1/researchanalytics/reports|/v1/researchanalytics/reports", "/v1/researchanalytics/test|/v1/researchanalytics/test"];
	}else if(s1.value == "Organizations"){
		var optionArray = ["|","/v1/organizations/internal|/v1/organizations/internal", "/v1/organizations/internal/{organizationCode}|/v1/organizations/internal/{organizationCode}", "/v1/organizations/test|/v1/organizations/test"];
	}
	for (var option in optionArray){
		var pair = optionArray[option].split("|");
		var newOption = document.createElement("option");
		newOption.value = pair[0];
		newOption.innerHTML = pair[1];
		s2.options.add(newOption);
	}
}

function chooseAPIResource(data) {
	document.getElementById ("APIVal").value = data.value;
}

function clickToHideOrShow() {
    var elementToHide = document.getElementById("RunAPIInfo");
    if (elementToHide.style.display === "none") {
        elementToHide.style.display = "block";
    } else {
        elementToHide.style.display = "none";
    }
}

// function Links()
// {
// 	console.log('in GoToLinks function');
// 	//add here
// 	inst_ID = document.getElementById("inst_ID").value, url="";
// 	console.log("ins_ID= "+ins_ID);
// 	switch (inst_ID) {
// 		case "01ADELPHI":
// 			url1="https://scholarlyworks.adelphi.edu/discovery/search?vid=" + inst_ID + ":ResearchRepository&debug=true";
// 			var WindowAlert = {
// 				A: function () {alert(url1)}
// 			}
// 			WindowAlert.A();
// 		break;
	
// 	}	



// }