module.exports = RoleSelectorDirective;

RoleSelectorDirective.$inject = [];

function RoleSelectorDirective() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            title: '='
        },
        controller: RoleSelectorController,
        template: require('./role-selector.html')
    };
}
RoleSelectorController.$inject = ['$scope', 'RoleEndpoint'];

function RoleSelectorController($scope, RoleEndpoint) {
    $scope.addAllRoles = addAllRoles;
    $scope.extractRoleNames = extractRoleNames;

    activate();
    function activate() {
        // getting available roles from api
        RoleEndpoint.query().$promise.then(function (roles) {
            $scope.roles = roles;
        });
    }

    // adding all available roles to model if user clicks 'Everyone'
    function addAllRoles() {
        $scope.model.role = extractRoleNames();
    }

    //extracting role-names
    function extractRoleNames() {
        return $scope.roles.map(function (role) {
            return role.name;
        });
    }
}