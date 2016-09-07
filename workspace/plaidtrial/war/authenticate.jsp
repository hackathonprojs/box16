<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String publicToken = request.getParameter("public_token");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>authenticate</title>
</head>
<body>


<%=publicToken%>

</body>
</html>