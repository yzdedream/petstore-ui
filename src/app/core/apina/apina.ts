/* tslint:disable */
import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Dictionary<V> {
    [key: string]: V;
}



export interface ApiResponse {
    code: number;
    message: string;
    type: string;
}

export interface AppUser {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    phone: string;
    userStatus: string;
    username: string;
}

export interface AppUserCreateForm {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
}

export interface AppUserUpdateForm {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Pet {
    category: Category;
    id: number;
    name: string;
    photoUrls: string[];
    status: string;
    tags: Tag[];
}

export interface PetCreateForm {
    categoryId: number;
    name: string;
    status: string;
    tagIDs: number[];
}

export interface PetUpdateForm {
    categoryId: number;
    name: string;
    status: string;
    tagIDs: number[];
}

export interface Tag {
    empty: boolean;
    id: number;
    name: string;
}

export function registerDefaultSerializers(config: ApinaConfig) {


    config.registerClassSerializer('ApiResponse', {
        'code': 'number',
        'message': 'string',
        'type': 'string'
    });

    config.registerClassSerializer('AppUser', {
        'email': 'string',
        'firstName': 'string',
        'id': 'number',
        'lastName': 'string',
        'phone': 'string',
        'userStatus': 'string',
        'username': 'string'
    });

    config.registerClassSerializer('AppUserCreateForm', {
        'email': 'string',
        'firstName': 'string',
        'lastName': 'string',
        'phone': 'string',
        'username': 'string'
    });

    config.registerClassSerializer('AppUserUpdateForm', {
        'email': 'string',
        'firstName': 'string',
        'lastName': 'string',
        'phone': 'string'
    });

    config.registerClassSerializer('Category', {
        'id': 'number',
        'name': 'string'
    });

    config.registerClassSerializer('Pet', {
        'category': 'Category',
        'id': 'number',
        'name': 'string',
        'photoUrls': 'string[]',
        'status': 'string',
        'tags': 'Tag[]'
    });

    config.registerClassSerializer('PetCreateForm', {
        'categoryId': 'number',
        'name': 'string',
        'status': 'string',
        'tagIDs': 'number[]'
    });

    config.registerClassSerializer('PetUpdateForm', {
        'categoryId': 'number',
        'name': 'string',
        'status': 'string',
        'tagIDs': 'number[]'
    });

    config.registerClassSerializer('Tag', {
        'empty': 'boolean',
        'id': 'number',
        'name': 'string'
    });

}

export class ApinaConfig {

    /** Prefix added for all API calls */
    baseUrl: string = "";

    private serializers: SerializerMap = {
        any: identitySerializer,
        string: identitySerializer,
        number: identitySerializer,
        boolean: identitySerializer
    };

    constructor() {
        registerDefaultSerializers(this);
    }

    serialize(value: any, type: string): any {
        return this.lookupSerializer(type).serialize(value);
    }

    deserialize(value: any, type: string): any {
        return this.lookupSerializer(type).deserialize(value);
    }

    registerSerializer(name: string, serializer: Serializer) {
        this.serializers[name] = serializer;
    }

    registerEnumSerializer(name: string, enumObject: any) {
        this.registerSerializer(name, enumSerializer(enumObject));
    }

    registerClassSerializer(name: string, fields: any) {
        this.registerSerializer(name, this.classSerializer(fields));
    }

    registerIdentitySerializer(name: string) {
        this.registerSerializer(name, identitySerializer);
    }

    registerDiscriminatedUnionSerializer(name: string, discriminator: string, types: { [key: string]: string; }) {
        this.registerSerializer(name, this.discriminatedUnionSerializer(discriminator, types));
    }

    private classSerializer(fields: any): Serializer {
        function mapProperties(obj: any, propertyMapper: (value: any, type: string) => any) {
            if (obj === null || obj === undefined) {
                return obj;
            }

            const result: any = {};

            for (const name in fields) {
                if (fields.hasOwnProperty(name)) {
                    const value: any = obj[name];
                    const type: string = fields[name];
                    result[name] = propertyMapper(value, type);
                }
            }

            return result;
        }

        const serialize = this.serialize.bind(this);
        const deserialize = this.deserialize.bind(this);
        return {
            serialize(obj) {
                return mapProperties(obj, serialize);
            },
            deserialize(obj) {
                return mapProperties(obj, deserialize);
            }
        };
    }

    private discriminatedUnionSerializer(discriminatorProperty: string, types: { [key: string]: string; }): Serializer {
        const resolveSerializer = (localType: string) => {
            return this.lookupSerializer(types[localType]);
        };

        return {
            serialize(obj) {
                if (obj == null) return null;

                const localType = obj[discriminatorProperty];
                const result = resolveSerializer(localType).serialize(obj);
                result[discriminatorProperty] = localType;
                return result;
            },
            deserialize(obj) {
                if (obj == null) return null;

                const localType = obj[discriminatorProperty];
                const result = resolveSerializer(localType).deserialize(obj);
                result[discriminatorProperty] = localType;
                return result;
            }
        };
    }

    private lookupSerializer(type: string): Serializer {
        if (!type) throw new Error("no type given");

        if (type.indexOf('[]', type.length - 2) !== -1) { // type.endsWith('[]')
            const elementType = type.substring(0, type.length - 2);
            const elementSerializer = this.lookupSerializer(elementType);
            return arraySerializer(elementSerializer);
        }

        const dictionaryMatched = /^Dictionary<(.+)>$/.exec(type);
        if (dictionaryMatched) {
            return dictionarySerializer(this.lookupSerializer(dictionaryMatched[1]));
        }

        const serializer = this.serializers[type];
        if (serializer) {
            return serializer;
        } else {
            throw new Error(`could not find serializer for type '${type}'`);
        }
    }
}

function arraySerializer(elementSerializer: Serializer): Serializer {
    function safeMap(value: any[], mapper: (a: any) => any) {
        if (!value)
            return value;
        else
            return value.map(mapper);
    }

    const serialize = elementSerializer.serialize.bind(elementSerializer);
    const deserialize = elementSerializer.deserialize.bind(elementSerializer);

    return {
        serialize(value) {
            return safeMap(value, serialize);
        },
        deserialize(value) {
            return safeMap(value, deserialize);
        }
    }
}

function dictionarySerializer(valueSerializer: Serializer): Serializer {
    function safeMap(dictionary: Dictionary<any>, mapper: (a: any) => any) {
        if (!dictionary)
            return dictionary;
        else {
            const result: any = {};
            for (const key in dictionary) {
                if (dictionary.hasOwnProperty(key)) {
                    result[key] = mapper(dictionary[key])
                }
            }
            return result
        }
    }

    const serialize = valueSerializer.serialize.bind(valueSerializer);
    const deserialize = valueSerializer.deserialize.bind(valueSerializer);

    return {
        serialize(value) {
            return safeMap(value, serialize);
        },
        deserialize(value) {
            return safeMap(value, deserialize);
        }
    }
}

function formatQueryParameters(params: { [key: string]: any }): string {
    const queryParameters: string[] = [];

    const addQueryParameter = (encodedKey: string, value: any) => {
        if (value != null)
            queryParameters.push(`${encodedKey}=${encodeURIComponent(value)}`);
    };

    for (const key of Object.keys(params || {})) {
        const value = params[key];
        const encodedKey = encodeURIComponent(key);

        if (Array.isArray(value)) {
            for (const arrayItemValue of value)
                addQueryParameter(encodedKey, arrayItemValue);
        } else {
            addQueryParameter(encodedKey, value);
        }
    }

    return queryParameters.length > 0 ? '?' + queryParameters.join('&') : '';
}

export interface UrlData {
    uriTemplate: string;
    pathVariables?: any;
    requestParams?: any;
}

export interface RequestData extends UrlData {
    method: string;
    requestBody?: any;
    responseType?: string;
}

export interface Serializer {
    serialize(o: any): any;
    deserialize(o: any): any;
}

const identitySerializer: Serializer = {
    serialize(o) {
        return o;
    },
    deserialize(o) {
        return o;
    }
};

function enumSerializer(enumObject: any): Serializer {
    return {
        serialize(o) {
            if (o === null || o === undefined)
                return o;
            else
                return enumObject[o];
        },
        deserialize(o) {
            if (o === null || o === undefined)
                return o;
            else
                return enumObject[o];
        }
    }
}

interface SerializerMap {
    [name: string]: Serializer;
}

export abstract class ApinaEndpointContext {

    constructor(protected config: ApinaConfig) {
    }

    abstract request(data: RequestData): Observable<any>

    url(data: UrlData): string {
        const url = this.buildUrl(data.uriTemplate, data.pathVariables);
        return url + formatQueryParameters(data.requestParams);
    }

    serialize(value: any, type: string): any {
        return this.config.serialize(value, type);
    }

    deserialize(value: any, type: string): any {
        return this.config.deserialize(value, type);
    }

    protected buildUrl(uriTemplate: String, pathVariables: any): string {
        return this.config.baseUrl + uriTemplate.replace(/{([^}]+)}/g, (match, name) => pathVariables[name]);
    }
}

@Injectable()
export class DefaultApinaEndpointContext extends ApinaEndpointContext {

    constructor(private httpClient: HttpClient, config: ApinaConfig) {
        super(config);
    }

    request(data: RequestData): Observable<any> {
        const url = this.buildUrl(data.uriTemplate, data.pathVariables);

        const requestParams = data.requestParams;
        let params: HttpParams | undefined = undefined;
        if (requestParams != null) {
            const filteredParams: { [key: string]: any }  = {};
            for (const key of Object.keys(requestParams)) {
                const value = requestParams[key];
                if (value != null)
                    filteredParams[key] = value;
            }

            params = new HttpParams({fromObject: filteredParams});
        }


        return this.httpClient.request(data.method, url, { params: params, body: data.requestBody })
            .pipe(map(r => data.responseType ? this.config.deserialize(r, data.responseType) : r));
    }
}

@Injectable()
export class HelloWorldEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    hello(): Observable<string> {
        return this.context.request({
            'uriTemplate': '/hello',
            'method': 'GET',
            'responseType': 'string'
        });
    }

}

@Injectable()
export class PetEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    createCategory(name: string): Observable<number> {
        return this.context.request({
            'uriTemplate': '/pet/category',
            'method': 'POST',
            'requestBody': this.context.serialize(name, 'string'),
            'responseType': 'number'
        });
    }

    createPet(form: PetCreateForm): Observable<number> {
        return this.context.request({
            'uriTemplate': '/pet',
            'method': 'POST',
            'requestBody': this.context.serialize(form, 'PetCreateForm'),
            'responseType': 'number'
        });
    }

    createTag(name: string): Observable<number> {
        return this.context.request({
            'uriTemplate': '/pet/tag',
            'method': 'POST',
            'requestBody': this.context.serialize(name, 'string'),
            'responseType': 'number'
        });
    }

    deltePet(petId: number): Observable<void> {
        return this.context.request({
            'uriTemplate': '/pet/{petId}',
            'method': 'DELETE',
            'pathVariables': {
                'petId': this.context.serialize(petId, 'number')
            }
        });
    }

    getCategories(): Observable<Category[]> {
        return this.context.request({
            'uriTemplate': '/pet/categories',
            'method': 'GET',
            'responseType': 'Category[]'
        });
    }

    getPets(): Observable<Pet[]> {
        return this.context.request({
            'uriTemplate': '/pet',
            'method': 'GET',
            'responseType': 'Pet[]'
        });
    }

    getTags(): Observable<Tag[]> {
        return this.context.request({
            'uriTemplate': '/pet/tags',
            'method': 'GET',
            'responseType': 'Tag[]'
        });
    }

    updatePet(form: PetUpdateForm, petId: number): Observable<void> {
        return this.context.request({
            'uriTemplate': '/pet/{petId}',
            'method': 'PUT',
            'pathVariables': {
                'petId': this.context.serialize(petId, 'number')
            },
            'requestBody': this.context.serialize(form, 'PetUpdateForm')
        });
    }

}

@Injectable()
export class UserEndpoint {
    constructor(private context: ApinaEndpointContext) {
    }

    createUser(user: AppUserCreateForm): Observable<ApiResponse> {
        return this.context.request({
            'uriTemplate': '/user',
            'method': 'POST',
            'requestBody': this.context.serialize(user, 'AppUserCreateForm'),
            'responseType': 'ApiResponse'
        });
    }

    findUserByName(username: string): Observable<AppUser> {
        return this.context.request({
            'uriTemplate': '/user/{username}',
            'method': 'GET',
            'pathVariables': {
                'username': this.context.serialize(username, 'string')
            },
            'responseType': 'AppUser'
        });
    }

    updateUser(form: AppUserUpdateForm, username: string): Observable<void> {
        return this.context.request({
            'uriTemplate': '/user/{username}',
            'method': 'PUT',
            'pathVariables': {
                'username': this.context.serialize(username, 'string')
            },
            'requestBody': this.context.serialize(form, 'AppUserUpdateForm')
        });
    }

}


export function apinaConfigFactory() {
    return new ApinaConfig();
}

@NgModule({
    imports: [HttpClientModule],
    providers: [
        HelloWorldEndpoint,
        PetEndpoint,
        UserEndpoint,
        { provide: ApinaEndpointContext, useClass: DefaultApinaEndpointContext },
        { provide: ApinaConfig, useFactory: apinaConfigFactory }
    ]
})
export class ApinaModule {}
