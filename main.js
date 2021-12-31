var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawn');


module.exports.loop = function () {

    spawner.run();



    var tower = Game.getObjectById('8d69ef12148c13528de45cf1');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    if (Memory.knownRooms == null) {
        Memory.knownRooms = {};
    }

    if (Memory.sources == null) {
        Memory.sources = {};
    }

    if (Memory.knownRooms[Game.spawns['Spawn1'].room] != true) {
        Memory.knownRooms[Game.spawns['Spawn1'].room] = true;
        
        for (var source in Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE)) {
            
            Memory.sources[Game.spawns['Spawn1'].room.find(FIND_SOURCES_ACTIVE)[source].id] = null;
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}