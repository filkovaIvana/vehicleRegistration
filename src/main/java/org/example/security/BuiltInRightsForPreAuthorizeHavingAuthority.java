package org.example.security;

public final class BuiltInRightsForPreAuthorizeHavingAuthority {

    private static final String HAS_AUTHORITY_PREFIX = "hasAuthority('";
    private static final String HAS_AUTHORITY_SUFFIX = "')";

    public static final String LIST = HAS_AUTHORITY_PREFIX + BuiltInRights.LIST + HAS_AUTHORITY_SUFFIX;
    public static final String ADD = HAS_AUTHORITY_PREFIX + BuiltInRights.ADD + HAS_AUTHORITY_SUFFIX;
    public static final String EDIT = HAS_AUTHORITY_PREFIX + BuiltInRights.EDIT + HAS_AUTHORITY_SUFFIX;
    public static final String REMOVE = HAS_AUTHORITY_PREFIX + BuiltInRights.REMOVE + HAS_AUTHORITY_SUFFIX;

    private BuiltInRightsForPreAuthorizeHavingAuthority() {
        // NO-OP utility class
    }
}
