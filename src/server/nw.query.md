```gql

{
  routers{
    serial,
    location,
		gip {
      octet1
      octet2
      octet3
      octet4
    }
  }
}

{
  router(IpAddress: {
    octet1: 192,
    octet2: 168,
    octet3: 1,
    octet4: 1
  }){
    serial,
    location,
		gip {
      ip
    }
    localPorts {
      ip
    }
  }
}

```