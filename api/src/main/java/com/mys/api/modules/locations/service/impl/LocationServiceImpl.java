package com.mys.api.modules.locations.service.impl;

import com.mys.api.modules.locations.model.Location;
import com.mys.api.modules.locations.repository.LocationRepository;
import com.mys.api.modules.locations.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;

    @Override
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
}
