package com.mys.api.modules.locations.service;

import com.mys.api.modules.locations.model.Location;
import java.util.List;

public interface LocationService {
    Location createLocation(Location location);
    List<Location> getAllLocations();
}
